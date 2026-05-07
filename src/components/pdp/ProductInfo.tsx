import { useState } from "react";
import type { Product } from "@/data/mockProducts";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { VariantSelector } from "./VariantSelector";
import { useCart } from "@/hooks/useCart";

export function ProductInfo({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const variant = product.variants.find((v) => v.id === variantId)!;

  const onAdd = () => {
    add({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      brandName: product.brandName,
      variantId: variant.id,
      variantLabel: variant.label,
      price: product.price,
      image: product.images[0],
      quantity: qty,
    });
  };

  return (
    <div className="flex flex-col">
      {product.badge && <div className="mb-3"><Badge>{product.badge}</Badge></div>}
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.brandName}</p>
      <h1 className="mt-2 font-heading text-4xl leading-tight">{product.title}</h1>
      <p className="mt-2 text-muted-foreground">{product.subtitle}</p>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="text-accent">★ {product.rating}</span>
        <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-2xl font-medium">${product.price}</span>
        {product.compareAtPrice && <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice}</span>}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <div className="mt-8">
        <VariantSelector variants={product.variants} value={variantId} onChange={setVariantId} />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-btn border">
          <button className="px-3 py-2 text-lg" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button className="px-3 py-2 text-lg" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <Button size="lg" className="flex-1" onClick={onAdd}>Add to bag — ${(product.price * qty).toFixed(0)}</Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-6 text-center text-xs text-muted-foreground">
        <div>Free shipping over $80</div>
        <div>Vegan & cruelty-free</div>
        <div>Made in Korea</div>
      </div>
    </div>
  );
}
