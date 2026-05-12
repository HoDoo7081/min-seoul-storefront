import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchCart,
  type ShopifyMoney,
} from "@/lib/shopify-api";

export interface ShopifyCartItem {
  lineId: string | null;
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  vendor: string;
  imageUrl: string;
  price: ShopifyMoney;
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: ShopifyCartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isOpen: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  toggleDrawer: (value?: boolean) => void;
  addItem: (item: Omit<ShopifyCartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useShopifyCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isOpen: false,
      isLoading: false,
      isSyncing: false,

      toggleDrawer: (value) =>
        set((s) => ({ isOpen: typeof value === "boolean" ? value : !s.isOpen })),

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existing = items.find((i) => i.variantId === item.variantId);
        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart(item.variantId, item.quantity);
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
              });
            }
          } else if (existing) {
            const newQty = existing.quantity + item.quantity;
            if (!existing.lineId) return;
            const r = await updateShopifyCartLine(cartId, existing.lineId, newQty);
            if (r.success) {
              set({
                items: get().items.map((i) =>
                  i.variantId === item.variantId ? { ...i, quantity: newQty } : i
                ),
              });
            } else if (r.cartNotFound) clearCart();
          } else {
            const r = await addLineToShopifyCart(cartId, item.variantId, item.quantity);
            if (r.success) {
              set({ items: [...get().items, { ...item, lineId: r.lineId ?? null }] });
            } else if (r.cartNotFound) clearCart();
          }
        } catch (e) {
          console.error("addItem failed:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const r = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (r.success) {
            set({
              items: get().items.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i
              ),
            });
          } else if (r.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const r = await removeLineFromShopifyCart(cartId, item.lineId);
          if (r.success) {
            const next = get().items.filter((i) => i.variantId !== variantId);
            if (next.length === 0) clearCart();
            else set({ items: next });
          } else if (r.cartNotFound) clearCart();
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const cart = await fetchCart(cartId);
          if (cart && cart.totalQuantity === 0) clearCart();
          if (!cart) clearCart();
        } catch (e) {
          console.error("syncCart failed:", e);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        items: s.items,
        cartId: s.cartId,
        checkoutUrl: s.checkoutUrl,
      }),
    }
  )
);
