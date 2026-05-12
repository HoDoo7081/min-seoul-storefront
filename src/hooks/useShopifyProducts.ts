import { useEffect, useState } from "react";
import { fetchProducts, fetchProductByHandle, type ShopifyProduct, type ShopifyProductNode } from "@/lib/shopify-api";

export function useShopifyProducts(query?: string, first = 50) {
  const [data, setData] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts(first, query)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, first]);

  return { data, loading, error };
}

export function useShopifyProduct(handle: string) {
  const [data, setData] = useState<ShopifyProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProductByHandle(handle)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { data, loading, error };
}

export function useCartSync() {
  useEffect(() => {
    // Lazy import to avoid SSR issues
    import("@/stores/cartStore").then(({ useShopifyCart }) => {
      useShopifyCart.getState().syncCart();
      const onVis = () => {
        if (document.visibilityState === "visible") {
          useShopifyCart.getState().syncCart();
        }
      };
      document.addEventListener("visibilitychange", onVis);
      return () => document.removeEventListener("visibilitychange", onVis);
    });
  }, []);
}
