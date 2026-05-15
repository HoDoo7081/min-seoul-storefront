import { useQuery } from "@tanstack/react-query";
import { checkShopifyHealth } from "@/lib/shopify";

export function useShopifyHealth() {
  return useQuery({
    queryKey: ["shopify-health"],
    queryFn: checkShopifyHealth,
    staleTime: 60 * 1000,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
