import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import homecareImg from "@/assets/search/homecare.png";
import estheticImg from "@/assets/search/esthetic.png";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Selvé" },
      { name: "description", content: "Search products and brands at Selvé." },
    ],
  }),
  component: SearchPage,
});

const CARDS = [
  {
    label: "Home Care Line",
    image: homecareImg,
    to: "/collections/$brandHandle" as const,
    params: { brandHandle: "giclee" },
  },
  {
    label: "Esthetic Line",
    image: estheticImg,
    to: "/collections/$brandHandle" as const,
    params: { brandHandle: "aesthein" },
  },
];

function SearchPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-16">
      <h1 className="text-[12px] font-medium uppercase tracking-[0.2em] text-foreground">
        Search
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            to: "/collections/$brandHandle",
            params: { brandHandle: "all" },
          });
        }}
        className="mt-6 flex items-end gap-3 border-b border-foreground pb-3"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-[18px] outline-none placeholder:text-muted-foreground/60"
          placeholder=""
        />
        <button
          type="submit"
          aria-label="Search"
          className="p-1 transition-opacity hover:opacity-60"
        >
          <SearchIcon size={20} />
        </button>
      </form>

      <section className="mt-12">
        <p className="flex items-center gap-2 text-[13px] font-medium">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7aa6d6]" />
          Skincare Line
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 md:max-w-[640px] md:gap-5">
          {CARDS.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              params={c.params}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-muted"
            >
              <img
                src={c.image}
                alt={c.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-3 text-background md:bottom-4 md:left-4">
                <div className="text-[15px] font-medium leading-tight md:text-[17px]">
                  {c.label}
                </div>
                <div className="mt-1 text-[11px] opacity-90">Shop Now ›</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
