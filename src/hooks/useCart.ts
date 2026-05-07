import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "bg_cart_v2";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type Action =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; variantId: string }
  | { type: "UPDATE_QUANTITY"; variantId: string; quantity: number }
  | { type: "TOGGLE_DRAWER"; value?: boolean }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

const initialState: CartState = { items: [], isOpen: false };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };
    case "ADD_ITEM": {
      const idx = state.items.findIndex(
        (i) => i.variantId === action.item.variantId
      );
      let items: CartItem[];
      if (idx >= 0) {
        items = state.items.map((i, n) =>
          n === idx ? { ...i, quantity: i.quantity + action.item.quantity } : i
        );
      } else {
        items = [...state.items, action.item];
      }
      return { ...state, items };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.variantId !== action.variantId),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.variantId === action.variantId
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isOpen: typeof action.value === "boolean" ? action.value : !state.isOpen,
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  toggleDrawer: (value?: boolean) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        if (Array.isArray(items)) dispatch({ type: "HYDRATE", items });
      }
    } catch {
      /* noop */
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* noop */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
      removeItem: (variantId) => dispatch({ type: "REMOVE_ITEM", variantId }),
      updateQuantity: (variantId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", variantId, quantity }),
      toggleDrawer: (value) => dispatch({ type: "TOGGLE_DRAWER", value }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Safe fallback so SSR / out-of-provider reads don't crash.
    return {
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      toggleDrawer: () => {},
      clearCart: () => {},
    };
  }
  return ctx;
}
