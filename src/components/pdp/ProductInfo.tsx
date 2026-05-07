import { useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { VariantSelector } from "./VariantSelector";
import { useCart } from "@/hooks/useCart";

const fmt = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

export function ProductInfo({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const { addItem, toggleDrawer } = useCart();
  const variant = product.variants.find((v) => v.id === variantId)!;
  const optionLabel = product.options[0]?.name ?? "Option";

  const onAdd = () => {
    addItem({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title,
      brandName: product.vendor,
      price: variant.price,
      image: variant.image?.url ?? product.images[0].url,
      quantity: qty,
    });
    toggleDrawer(true);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex gap-2">
        {product.isBestSeller && <Badge>Bestseller</Badge>}
        {product.isNew && <Badge>New</Badge>}
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {product.vendor}
      </p>
      <h1 className="mt-2 font-heading text-4xl leading-tight">{product.title}</h1>
      <p className="mt-2 text-muted-foreground">{product.shortDescription}</p>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="text-accent">★ {product.rating}</span>
        <span className="text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-2xl font-medium">{fmt(variant.price)}</span>
        {product.compareAtPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {fmt(product.compareAtPrice)}
          </span>
        )}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-8">
        <VariantSelector
          variants={product.variants}
          value={variantId}
          onChange={setVariantId}
          label={optionLabel}
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-btn border">
          <button
            className="px-3 py-2 text-lg"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >
            −
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button className="px-3 py-2 text-lg" onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>
        <Button size="lg" className="flex-1" onClick={onAdd}>
          Add to bag — {fmt(variant.price * qty)}
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-6 text-center text-xs text-muted-foreground">
        <div>₩80,000 이상 무료배송</div>
        <div>비건 & 크루얼티-프리</div>
        <div>Made in Korea</div>
      </div>
    </div>
  );
}
