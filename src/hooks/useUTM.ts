import { useEffect } from "react";

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

function setCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function readDiscount(): string {
  if (typeof window === "undefined") return "";
  return (
    getCookie("utm_discount") ||
    sessionStorage.getItem("utm_discount") ||
    ""
  );
}

export function useUTM() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    const discount = params.get("discount");
    if (source) {
      setCookie("utm_source", source);
      setCookie("utm_campaign", campaign ?? "");
      if (discount) setCookie("utm_discount", discount);
      // legacy
      sessionStorage.setItem("utm_source", source);
      sessionStorage.setItem("utm_campaign", campaign ?? "");
      sessionStorage.setItem("utm_discount", discount ?? "");
    }
  }, []);

  if (typeof window === "undefined") {
    return { source: "", campaign: "", discount: "" };
  }

  return {
    source: getCookie("utm_source") || sessionStorage.getItem("utm_source") || "",
    campaign: getCookie("utm_campaign") || sessionStorage.getItem("utm_campaign") || "",
    discount: readDiscount(),
  };
}
