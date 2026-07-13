import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function ReviewSection({ product: _product }: { product: Product }) {
  const { t } = useLocale();
  return (
    <section id="reviews" className="mx-auto mt-16 max-w-[1280px] px-5 md:px-10">
      <h2 className="font-heading text-[28px]">{t("review.title")}</h2>
      <div className="mt-8 flex flex-col items-center justify-center rounded-[12px] border bg-surface px-6 py-16 text-center">
        <Star size={22} className="text-muted-foreground" strokeWidth={1.5} />
        <p className="mt-3 text-[14px] text-foreground">No reviews yet.</p>
        <p className="mt-1 max-w-[420px] text-[12.5px] text-muted-foreground">
          Verified customer reviews will appear here once they arrive.
        </p>
      </div>
    </section>
  );
}
