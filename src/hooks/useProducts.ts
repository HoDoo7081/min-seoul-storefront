import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductByHandle } from "@/lib/shopify";

export function useProducts(query?: string) {
  return useQuery({
    queryKey: ["products", query ?? "all"],
    queryFn: () => fetchProducts(query),
    staleTime: 0,
    gcTime: 0,
    retry: 2,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: true,
    refetchInterval: ({ state }) =>
      Array.isArray(state.data) && state.data.length === 0 ? 3000 : false,
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: Boolean(handle),
    staleTime: 5 * 60 * 1000,
  });
}
