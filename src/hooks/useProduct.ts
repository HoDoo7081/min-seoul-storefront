import { useShopifyProduct } from "./useProducts";

export function useProduct(handle: string) {
  const { data, isLoading, isError } = useShopifyProduct(handle);
  return { product: data ?? undefined, isLoading, isError };
}
