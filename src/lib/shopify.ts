// Shopify Storefront API client — stub.
// Replace with real Storefront API calls when SHOPIFY_STOREFRONT_TOKEN is configured.
import { products, getProduct, getByBrand } from "@/data/mockProducts";
import { brands } from "@/data/mockBrands";

export const shopify = {
  listProducts: async () => products,
  getProduct: async (handle: string) => getProduct(handle),
  listByBrand: async (brandHandle: string) => getByBrand(brandHandle),
  listBrands: async () => brands,
};
