import { getProduct } from "@/data/mockProducts";
export function useProduct(handle: string) {
  return getProduct(handle);
}
