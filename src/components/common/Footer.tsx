import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import { brands } from "@/data/mockBrands";
import { useLocale } from "@/hooks/useLocale";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.5 2.5 2.5 4.5 5 5" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com/pureve.seoul", Icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com/@pureve.seoul", Icon: TikTokIcon },
  { label: "YouTube", href: "https://youtube.com/@pureve.seoul", Icon: Youtube },
];

export function Footer() {
  const { t } = useLocale();
  const legal = [
    { label: "Terms", to: "/pages/terms" },
    { label: "Privacy Policy", to: "/pages/privacy" },
    { label: "Business Info", to: "/pages/business" },
  ];
  return (
    <footer
      className="w-full text-white"
      style={{
        backgroundColor: "var(--color-primary, hsl(var(--primary)))",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Section 1 */}
        <div className="grid gap-12 pt-10 pb-8 md:grid-cols-3 md:gap-10 md:pt-[60px] md:pb-10">
          {/* LEFT */}
          <div>
            <Link
              to="/"
              className="font-heading text-white"
              style={{ fontSize: 20, letterSpacing: "0.05em" }}
            >
              Purève Seoul
            </Link>
            <p className="mt-2 text-[14px] text-white/60">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
              {brands.map((b, i) => (
                <span key={b.handle} className="flex items-center gap-3">
                  <Link
                    to="/collections/$brandHandle"
                    params={{ brandHandle: b.handle }}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {b.name}
                  </Link>
                  {i < brands.length - 1 && (
                    <span className="text-white/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] text-white/80">
              {t("footer.support")}
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-white/60">
              <li>
                {t("footer.email")}:{" "}
                <a
                  href="mailto:contact@koreabridging.com"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  contact@koreabridging.com
                </a>
              </li>
              <li>{t("footer.hours")}</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.2em] text-white/80">
              {t("footer.social")}
            </h4>
            <div className="mt-4 flex items-center gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 text-[12px] text-white/40 md:flex-row md:items-center">
          <p>© 2026 Purève Seoul. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {legal.map((l, i) => (
              <li key={l.label} className="flex items-center gap-3">
                <Link
                  to={l.to}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
                {i < legal.length - 1 && <span className="text-white/20">·</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
