import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type GateResult = {
  country: string;
  taiwanEzWayId: string | null;
};

const COUNTRIES: { code: string; label: string }[] = [
  { code: "KR", label: "South Korea · 대한민국" },
  { code: "TW", label: "Taiwan · 台灣" },
  { code: "US", label: "United States" },
  { code: "JP", label: "Japan · 日本" },
  { code: "HK", label: "Hong Kong · 香港" },
  { code: "CN", label: "China · 中国" },
  { code: "SG", label: "Singapore" },
  { code: "MY", label: "Malaysia" },
  { code: "TH", label: "Thailand · ไทย" },
  { code: "VN", label: "Vietnam" },
  { code: "PH", label: "Philippines" },
  { code: "ID", label: "Indonesia" },
  { code: "AU", label: "Australia" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
];

// Map free-text country in profile to a 2-letter code we can pre-select.
function countryToCode(v?: string | null): string | undefined {
  if (!v) return undefined;
  const trimmed = v.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) return trimmed.toUpperCase();
  const s = trimmed.toLowerCase();
  const map: Record<string, string> = {
    "south korea": "KR", "korea": "KR", "republic of korea": "KR",
    "대한민국": "KR", "한국": "KR",
    "taiwan": "TW", "台灣": "TW", "台湾": "TW",
    "china": "CN", "中国": "CN", "中國": "CN",
    "hong kong": "HK", "香港": "HK",
    "japan": "JP", "日本": "JP",
    "united states": "US", "usa": "US", "america": "US",
    "united kingdom": "GB", "uk": "GB", "britain": "GB",
    "thailand": "TH", "singapore": "SG", "malaysia": "MY",
    "vietnam": "VN", "philippines": "PH", "indonesia": "ID",
    "australia": "AU", "canada": "CA",
  };
  return map[s];
}

export function PreCheckoutGate({
  open,
  initialCountry,
  initialEzWayId,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  initialCountry?: string | null;
  initialEzWayId?: string | null;
  onCancel: () => void;
  onConfirm: (r: GateResult) => void;
}) {
  const [country, setCountry] = useState<string>(
    () => countryToCode(initialCountry) ?? "",
  );
  const [ezWayId, setEzWayId] = useState<string>((initialEzWayId ?? "").toUpperCase());
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setCountry(countryToCode(initialCountry) ?? "");
      setEzWayId((initialEzWayId ?? "").toUpperCase());
      setTouched(false);
    }
  }, [open, initialCountry, initialEzWayId]);

  if (!open) return null;

  const isTW = country === "TW";
  const ezWayValid = /^[A-Za-z][0-9]{9}$/.test(ezWayId.trim());
  const canConfirm = !!country && (!isTW || ezWayValid);

  const handleConfirm = () => {
    setTouched(true);
    if (!canConfirm) return;
    onConfirm({
      country,
      taiwanEzWayId: isTW ? ezWayId.trim().toUpperCase() : null,
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="relative w-full max-w-[460px] rounded-2xl bg-background p-7 shadow-2xl">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 hover:bg-muted hover:text-foreground"
        >
          <X size={18} />
        </button>

        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Before checkout · 결제 전 확인
        </p>
        <h3 className="mt-2 font-heading text-[22px] leading-tight tracking-tight">
          Where are we shipping to?
        </h3>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          배송 국가를 선택해 주세요. Taiwan 주문은 통관을 위해 개인번호가 필요합니다.
        </p>

        <label className="mt-6 flex flex-col gap-2">
          <span className="text-[12.5px]">Shipping country · 배송 국가</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11 rounded-full bg-muted px-4 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
          >
            <option value="">— Select —</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        {isTW && (
          <label className="mt-4 flex flex-col gap-2">
            <span className="text-[12.5px]">
              身分證字號 / EZ Way 通關號碼{" "}
              <span className="text-red-600">*</span>
            </span>
            <input
              type="text"
              value={ezWayId}
              onChange={(e) => setEzWayId(e.target.value.toUpperCase())}
              placeholder="A123456789"
              maxLength={10}
              className={`h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10 ${
                touched && !ezWayValid ? "ring-2 ring-red-500/50" : ""
              }`}
            />
            <span className="text-[11.5px] text-muted-foreground">
              Required for Taiwan customs (EZ Way). Format: 1 letter + 9 digits.
              台灣海關通關必填，格式：1 個英文字母 + 9 個數字。
            </span>
          </label>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="h-11 rounded-full bg-foreground text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Continue to checkout
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-[12px] text-muted-foreground underline hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
