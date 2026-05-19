import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchProductByHandle } from "@/lib/shopify";

// staleTime을 10분으로 늘리고, gcTime 30분으로 설정 → 페이지 이동 시 재요청 방지
export function useProducts(query?: string) {
  return useQuery({
    queryKey: ["products", query ?? "all"],
    queryFn: () => fetchProducts(query),
    staleTime: 10 * 60 * 1000,   // 10분간 fresh
    gcTime: 30 * 60 * 1000,      // 30분간 메모리 보관
    retry: 1,
    retryDelay: 2000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev, // 이전 데이터 유지 (깜빡임 방지)
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
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
