// Products are now sourced from Shopify Storefront API.
// This file is kept only to satisfy historical type re-exports.
import type { Product } from "@/lib/types";

export type { Product };

export const products: Product[] = [];

export const getProduct = (_handle: string): Product | undefined => undefined;

export const getByBrand = (_brandHandle: string): Product[] => [];
