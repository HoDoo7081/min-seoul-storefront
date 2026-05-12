import { Link } from "@tanstack/react-router";
import skincareImg from "@/assets/home/card-skincare.jpg";
import setsImg from "@/assets/home/card-sets.jpg";

const ITEMS = [
  { label: "Skincare", img: skincareImg, brandHandle: "all" },
  { label: "Sets", img: setsImg, brandHandle: "all" },
];

export function CategoryDuo() {
  return (
    <section className="grid grid-cols-2 pt-6">
      {ITEMS.map((it) => (
        <Link
          key={it.label}
          to="/collections/$brandHandle"
          params={{ brandHandle: it.brandHandle }}
          className="group relative block aspect-[3/4] overflow-hidden md:aspect-[4/5]"
        >
          <img
            src={it.img}
            alt={it.label}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
          <h3 className="absolute bottom-5 left-5 text-[24px] font-medium text-white md:text-[28px]">
            {it.label}
          </h3>
        </Link>
      ))}
    </section>
  );
}
