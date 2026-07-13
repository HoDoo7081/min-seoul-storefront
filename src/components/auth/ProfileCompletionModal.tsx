import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { syncShopifyCustomer } from "@/lib/shopify-customer.functions";
import { toast } from "sonner";

const COUNTRIES: { code: string; label: string }[] = [
  { code: "KR", label: "South Korea (대한민국)" },
  { code: "TW", label: "Taiwan (台灣)" },
  { code: "US", label: "United States" },
  { code: "JP", label: "Japan (日本)" },
  { code: "HK", label: "Hong Kong (香港)" },
  { code: "CN", label: "China (中国)" },
  { code: "SG", label: "Singapore" },
  { code: "MY", label: "Malaysia" },
  { code: "TH", label: "Thailand" },
  { code: "VN", label: "Vietnam" },
  { code: "PH", label: "Philippines" },
  { code: "ID", label: "Indonesia" },
  { code: "AU", label: "Australia" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
];

const PENDING_KEY = "pending_profile_v1";

export type PendingProfile = {
  full_name?: string;
  phone?: string;
  shipping_address_line1?: string;
  shipping_address_line2?: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  taiwan_ez_way_id?: string;
};

export function savePendingProfile(p: PendingProfile) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

function loadPendingProfile(): PendingProfile | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingProfile) : null;
  } catch {
    return null;
  }
}

function clearPendingProfile() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

function isIncomplete(p: {
  shipping_country: string | null;
  shipping_address_line1: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  taiwan_ez_way_id: string | null;
}) {
  if (!p.shipping_country || !p.shipping_address_line1 || !p.shipping_city || !p.shipping_postal_code) {
    return true;
  }
  if (p.shipping_country.toUpperCase() === "TW" && !p.taiwan_ez_way_id) return true;
  return false;
}

export function ProfileCompletionModal() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, updateProfile, refetch } = useProfile();
  const syncCustomer = useServerFn(syncShopifyCustomer);

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [ezWayId, setEzWayId] = useState("");
  const [saving, setSaving] = useState(false);
  const [appliedPending, setAppliedPending] = useState(false);

  // Apply any pending profile stashed during signUp (email-confirm flow)
  useEffect(() => {
    if (!user || !profile || appliedPending) return;
    const pending = loadPendingProfile();
    if (!pending) {
      setAppliedPending(true);
      return;
    }
    setAppliedPending(true);
    void (async () => {
      const { error } = await updateProfile({
        full_name: pending.full_name ?? profile.full_name ?? null,
        phone: pending.phone ?? profile.phone ?? null,
        shipping_address_line1: pending.shipping_address_line1 ?? profile.shipping_address_line1 ?? null,
        shipping_address_line2: pending.shipping_address_line2 ?? profile.shipping_address_line2 ?? null,
        shipping_city: pending.shipping_city ?? profile.shipping_city ?? null,
        shipping_postal_code: pending.shipping_postal_code ?? profile.shipping_postal_code ?? null,
        shipping_country: pending.shipping_country ?? profile.shipping_country ?? null,
        taiwan_ez_way_id: pending.taiwan_ez_way_id ?? profile.taiwan_ez_way_id ?? null,
      });
      if (!error) {
        clearPendingProfile();
        try {
          await syncCustomer();
        } catch {
          /* ignore */
        }
        await refetch();
      }
    })();
  }, [user, profile, appliedPending, updateProfile, refetch, syncCustomer]);

  const shouldOpen = useMemo(() => {
    if (authLoading || profileLoading) return false;
    if (!user || !profile) return false;
    if (!appliedPending) return false;
    return isIncomplete(profile);
  }, [authLoading, profileLoading, user, profile, appliedPending]);

  useEffect(() => {
    setOpen(shouldOpen);
    if (shouldOpen && profile) {
      setCountry(profile.shipping_country ?? "");
      setAddress1(profile.shipping_address_line1 ?? "");
      setAddress2(profile.shipping_address_line2 ?? "");
      setCity(profile.shipping_city ?? "");
      setPostal(profile.shipping_postal_code ?? "");
      setPhone(profile.phone ?? "");
      setEzWayId(profile.taiwan_ez_way_id ?? "");
    }
  }, [shouldOpen, profile]);

  if (!open) return null;

  const isTaiwan = country.toUpperCase() === "TW";
  const ezWayValid = !isTaiwan || /^[A-Za-z][0-9]{9}$/.test(ezWayId.trim());

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country || !address1 || !city || !postal) {
      toast.error("Please complete all required fields.");
      return;
    }
    if (isTaiwan && !ezWayValid) {
      toast.error("Please enter a valid Taiwan ID / EZ Way number (1 letter + 9 digits).");
      return;
    }
    setSaving(true);
    const { error } = await updateProfile({
      phone: phone || null,
      shipping_address_line1: address1,
      shipping_address_line2: address2 || null,
      shipping_city: city,
      shipping_postal_code: postal,
      shipping_country: country,
      taiwan_ez_way_id: isTaiwan ? ezWayId.trim().toUpperCase() : null,
    });
    if (error) {
      setSaving(false);
      toast.error("Failed to save. Please try again.");
      return;
    }
    try {
      await syncCustomer();
    } catch {
      /* ignore */
    }
    await refetch();
    setSaving(false);
    setOpen(false);
    toast.success("Profile completed.");
  };

  const inputCls =
    "h-11 w-full rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl md:p-8">
        <h2 className="font-heading text-[26px] leading-tight tracking-tight">
          Complete your profile
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          We need your shipping address to complete registration. Taiwan customers must
          provide their EZ Way ID (身分證字號) as required by customs.
        </p>

        <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[13px]">
              Country / Region <span className="text-destructive">*</span>
            </span>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputCls}
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          {isTaiwan && (
            <label className="flex flex-col gap-2">
              <span className="text-[13px]">
                身分證字號 / EZ Way ID <span className="text-destructive">*</span>
              </span>
              <input
                type="text"
                required
                value={ezWayId}
                onChange={(e) => setEzWayId(e.target.value.toUpperCase())}
                placeholder="A123456789"
                maxLength={10}
                className={inputCls}
              />
              <span className="text-[11px] text-muted-foreground">
                Taiwan customs requires this ID (1 letter + 9 digits) for all imports.
              </span>
            </label>
          )}

          <label className="flex flex-col gap-2">
            <span className="text-[13px]">
              Address <span className="text-destructive">*</span>
            </span>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={inputCls}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px]">Address line 2 (optional)</span>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className={inputCls}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-2">
              <span className="text-[13px]">
                City <span className="text-destructive">*</span>
              </span>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[13px]">
                Postal code <span className="text-destructive">*</span>
              </span>
              <input
                type="text"
                required
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className={inputCls}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-[13px]">Phone (optional)</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
            />
          </label>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={async () => {
                await signOut();
                await supabase.auth.signOut();
                setOpen(false);
              }}
              className="text-[12px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Cancel & sign out
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-11 rounded-full bg-foreground px-7 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
