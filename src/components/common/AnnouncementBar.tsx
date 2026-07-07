import { useState } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function AnnouncementBar() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  const msgs = [t("announcement.0"), t("announcement.1"), t("announcement.2")];

  const prev = () => setIdx((i) => (i - 1 + msgs.length) % msgs.length);
  const next = () => setIdx((i) => (i + 1) % msgs.length);

  return (
    <div className="relative flex h-9 items-center justify-center bg-foreground text-background text-[12px] tracking-wide px-12">
      {msgs.length > 1 && (
        <button onClick={prev} aria-label="Previous announcement"
          className="absolute left-3 text-background/60 hover:text-background transition-colors text-base leading-none">
          ‹
        </button>
      )}

      <span className="truncate">{msgs[idx]}</span>

      {msgs.length > 1 && (
        <button onClick={next} aria-label="Next announcement"
          className="absolute left-10 text-background/60 hover:text-background transition-colors text-base leading-none">
          ›
        </button>
      )}

      <button onClick={() => setVisible(false)} aria-label="Close announcement"
        className="absolute right-3 text-background/60 hover:text-background transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
