const stats = [
  { k: "3", v: "Korean houses" },
  { k: "120+", v: "Products curated" },
  { k: "40", v: "Countries shipped" },
  { k: "98%", v: "Repurchase rate" },
];
export function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border bg-border md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.v} className="bg-surface p-8 text-center">
          <div className="font-heading text-4xl text-foreground">{s.k}</div>
          <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
        </div>
      ))}
    </div>
  );
}
