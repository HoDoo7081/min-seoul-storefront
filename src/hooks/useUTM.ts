import { useEffect } from "react";

export function useUTM() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    const discount = params.get("discount");
    if (source) {
      sessionStorage.setItem("utm_source", source);
      sessionStorage.setItem("utm_campaign", campaign ?? "");
      sessionStorage.setItem("utm_discount", discount ?? "");
    }
  }, []);

  if (typeof window === "undefined") {
    return { source: "", campaign: "", discount: "" };
  }

  return {
    source: sessionStorage.getItem("utm_source") ?? "",
    campaign: sessionStorage.getItem("utm_campaign") ?? "",
    discount: sessionStorage.getItem("utm_discount") ?? "",
  };
}
