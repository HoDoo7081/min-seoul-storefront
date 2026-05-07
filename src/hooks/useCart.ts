import { useEffect, useState, useCallback } from "react";
import type { CartLine } from "@/lib/types";

const KEY = "bg_cart_v1";
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  listeners.forEach((l) => l());
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(read());
    const sync = () => setLines(read());
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, []);

  const add = useCallback((line: CartLine) => {
    const cur = read();
    const i = cur.findIndex((l) => l.productId === line.productId && l.variantId === line.variantId);
    if (i >= 0) cur[i].quantity += line.quantity;
    else cur.push(line);
    write(cur);
  }, []);

  const update = useCallback((productId: string, variantId: string, quantity: number) => {
    const cur = read().map((l) => l.productId === productId && l.variantId === variantId ? { ...l, quantity } : l).filter((l) => l.quantity > 0);
    write(cur);
  }, []);

  const remove = useCallback((productId: string, variantId: string) => {
    write(read().filter((l) => !(l.productId === productId && l.variantId === variantId)));
  }, []);

  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  return { lines, add, update, remove, subtotal, count };
}
