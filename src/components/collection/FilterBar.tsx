type Props = {
  sortBy: string;
  onSortChange: (v: string) => void;
  count: number;
};
export function FilterBar({ sortBy, onSortChange, count }: Props) {
  return (
    <div className="flex items-center justify-between border-y py-4">
      <p className="text-sm text-muted-foreground">{count} products</p>
      <div className="flex items-center gap-3 text-sm">
        <label className="text-muted-foreground">Sort by</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="rounded-btn border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
