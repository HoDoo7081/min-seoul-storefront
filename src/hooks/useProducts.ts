import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductByHandle } from "@/lib/shopify";

export function useProducts(query?: string) {
  return useQuery({
    queryKey: ["products", "fx-v3", query ?? "all"],
    queryFn: () => fetchProducts(query),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    retryDelay: 2000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["product", "fx-v3", handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: Boolean(handle),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
