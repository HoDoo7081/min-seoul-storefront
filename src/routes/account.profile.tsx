import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { syncShopifyCustomer } from "@/lib/shopify-customer.functions";
import { toast } from "sonner";


export const Route = createFileRoute("/account/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "My Profile — Min Seoul" }],
  }),
});

function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const syncCustomer = useServerFn(syncShopifyCustomer);
  const navigate = useNavigate();


  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [ezWayId, setEzWayId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/account/login" });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
      setAddress1(profile.shipping_address_line1 ?? "");
      setAddress2(profile.shipping_address_line2 ?? "");
      setCity(profile.shipping_city ?? "");
      setPostal(profile.shipping_postal_code ?? "");
      setCountry(profile.shipping_country ?? "");
      setEzWayId(profile.taiwan_ez_way_id ?? "");
    }
  }, [profile]);

  const isTaiwan = /taiwan|台灣|台湾|^tw$/i.test(country.trim());
  // Taiwan EZ Way ID: 1 letter + 9 digits (national ID) or ARC format
  const ezWayValid = !isTaiwan || /^[A-Za-z][0-9]{9}$/.test(ezWayId.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isTaiwan && !ezWayValid) {
      toast.error("Please enter a valid Taiwan ID / EZ Way number (1 letter + 9 digits).");
      return;
    }
    setSaving(true);
    const { error } = await updateProfile({
      full_name: fullName || null,
      phone: phone || null,
      shipping_address_line1: address1 || null,
      shipping_address_line2: address2 || null,
      shipping_city: city || null,
      shipping_postal_code: postal || null,
      shipping_country: country || null,
      taiwan_ez_way_id: isTaiwan ? ezWayId.trim().toUpperCase() || null : null,
    });
    if (error) {
      setSaving(false);
      toast.error("Failed to save. Please try again.");
      return;
    }
    // Sync to Shopify customer record (non-blocking for UX)
    try {
      const res = await syncCustomer();
      if (!res.ok) console.warn("[Shopify customer sync]", res.error);
    } catch (err) {
      console.warn("[Shopify customer sync]", err);
    }
    setSaving(false);
    toast.success("Profile saved.");
  };


  if (authLoading || !user || profileLoading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-5 py-14 md:px-10 md:py-20">
        <p className="text-[13px] text-muted-foreground">Loading…</p>
      </section>
    );
  }

  const inputCls =
    "h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10";

  return (
    <section className="mx-auto max-w-[720px] px-5 py-14 md:px-10 md:py-20">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
          My Profile
        </h1>
        <Link
          to="/account/dashboard"
          className="text-[12px] uppercase tracking-widest underline hover:text-foreground"
        >
          ← Account
        </Link>
      </div>
      <p className="mt-2 text-[13.5px] text-muted-foreground">
        This information will be used to pre-fill your checkout.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[13px]">Full name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputCls}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px]">E-mail</span>
          <input
            type="email"
            value={user.email ?? ""}
            disabled
            className={`${inputCls} opacity-70`}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px]">Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+82 10-1234-5678"
            className={inputCls}
          />
        </label>

        <div className="mt-4 border-t pt-6">
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Shipping Address
          </h2>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[13px]">Address line 1</span>
          <input
            type="text"
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

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[13px]">City</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[13px]">Postal code</span>
            <input
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              className={inputCls}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[13px]">Country</span>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="South Korea"
            className={inputCls}
          />
        </label>

        {isTaiwan && (
          <label className="flex flex-col gap-2">
            <span className="text-[13px]">
              身分證字號 / EZ Way 通關號碼 <span className="text-red-600">*</span>
            </span>
            <input
              type="text"
              value={ezWayId}
              onChange={(e) => setEzWayId(e.target.value.toUpperCase())}
              placeholder="A123456789"
              maxLength={10}
              required
              className={`${inputCls} ${!ezWayValid ? "ring-2 ring-red-500/40" : ""}`}
            />
            <span className="text-[11.5px] text-muted-foreground">
              Required for Taiwan customs clearance (EZ Way). Format: 1 letter + 9 digits. Auto-synced to Shopify orders.
            </span>
          </label>
        )}


        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="h-11 rounded-full bg-foreground px-9 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
