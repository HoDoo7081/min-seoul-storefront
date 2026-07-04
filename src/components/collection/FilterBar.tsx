import { useLocale } from "@/hooks/useLocale";

type Props = {
  sortBy: string;
  onSortChange: (v: string) => void;
  count: number;
};
export function FilterBar({ sortBy, onSortChange, count }: Props) {
  const { tt } = useLocale();
  return (
    <div className="flex items-center justify-between border-y py-4">
      <p className="text-sm text-muted-foreground">{count} {tt("products")}</p>
      <div className="flex items-center gap-3 text-sm">
        <label className="text-muted-foreground">{tt("Sort by")}</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="rounded-btn border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent">
          <option value="featured">{tt("Featured")}</option>
          <option value="price-asc">{tt("Price: Low to High")}</option>
          <option value="price-desc">{tt("Price: High to Low")}</option>
          <option value="rating">{tt("Top Rated")}</option>
        </select>
      </div>
    </div>
  );
}
