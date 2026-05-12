import { useShopifyProduct } from "./useProducts";

export function useProduct(handle: string) {
  return useShopifyProduct(handle).data ?? undefined;
}
