import cleansingGelCard     from "@/assets/products/cleansing-gel-card.jpg";
import cleansingGelCard2    from "@/assets/products/cleansing-gel-card-2.jpg";
import velvetCreamCard      from "@/assets/products/velvet-cream-card.jpg";
import velvetCreamCard2     from "@/assets/products/velvet-cream-card-2.jpg";
import essenceCard          from "@/assets/products/essence-card.jpg";
import essenceCard2         from "@/assets/products/essence-card-2.jpg";
import antiAgingCard        from "@/assets/products/anti-aging-card.jpg";
import antiAgingCard2       from "@/assets/products/anti-aging-card-2.jpg";
import homecareSeteCard     from "@/assets/products/homecare-set-card.jpg";
import homecareSeteCard2    from "@/assets/products/homecare-set-card-2.jpg";
import proSetCard           from "@/assets/products/pro-set-card.jpg";
import proSetCard2          from "@/assets/products/pro-set-card-2.jpg";
import gicleeCremaCard      from "@/assets/products/giclee-cream-card.jpg";
import gicleeCremaCard2     from "@/assets/products/giclee-cream-card-2.jpg";
import gicleeCleansingCard  from "@/assets/products/giclee-cleansing-card.jpg";
import gicleeCleansingCard2 from "@/assets/products/giclee-cleansing-card-2.jpg";
import gicleeBarrierCard    from "@/assets/products/giclee-barrier-card.jpg";
import dolidoTonerCard      from "@/assets/products/dolido-toner-card.jpg";
import faceFitToxCard       from "@/assets/pdp/face-fit-tox/kit-overview.png";
import gicleeSunCard        from "@/assets/products/giclee-suncream-card.jpg";
import gicleeMaskCard       from "@/assets/products/giclee-mask-card.jpg";
import gicleeMaskCard2      from "@/assets/products/giclee-mask-card-2.jpg";
import greenTomatoRelated   from "@/assets/pdp/muscat-grape/related-green-tomato.png";
import greenTomatoHover     from "@/assets/pdp/green-tomato/duo.png";
import applePeelRelated     from "@/assets/pdp/muscat-grape/related-apple-peel.png";
import applePeelHover       from "@/assets/pdp/apple-peel/duo.png";
import muscatGrapeCard      from "@/assets/pdp/muscat-grape/product-main.png";
import muscatGrapeHover     from "@/assets/pdp/muscat-grape/trio.png";

export const LOCAL_PRODUCT_IMAGES: Record<string, [string, string?]> = {
  // Aesthein
  "derma-sense-cleansing-gel":                   [cleansingGelCard,    cleansingGelCard2],
  "atp-nad-synergy-velvet-cream":                [velvetCreamCard,     velvetCreamCard2],
  "4gf-supreme-plumping-essence":                [essenceCard,         essenceCard2],
  "anti-aging-line-set":                         [antiAgingCard,       antiAgingCard2],
  "essential-home-care-set-set-of-9":            [homecareSeteCard,    homecareSeteCard2],
  "professional-care-set-set-of-10":             [proSetCard,          proSetCard2],
  // Giclee (THE CLINIC)
  "the-clinic-ectoin-barrier-restorative-cream": [gicleeCremaCard2,     gicleeCremaCard],
  "the-clinic-ectoin-ph-balancing-gel-cleanser": [gicleeCleansingCard2, gicleeCleansingCard],
  "the-clinic-barrier-line":                     [gicleeBarrierCard,   undefined],
  // Dolido
  "dolido-tea-tree-toner":                       [dolidoTonerCard,     undefined],
  // Face-Fit Tox
  "face-fit-tox-kit-7ml-3-vials":                [faceFitToxCard, undefined],
  "the-clinic-ectoin-protective-sun-cream":      [gicleeSunCard, undefined],
  "the-clinic-ectoin-rejuvenating-silky-fit-mask": [gicleeMaskCard, gicleeMaskCard2],
  "green-tomato-pore-set-2-piece":               [greenTomatoRelated, greenTomatoHover],
  "apple-peel-set-2-piece":                      [applePeelRelated, applePeelHover],
  "muscat-grape-set-3-piece":                    [muscatGrapeCard, muscatGrapeHover],
};

export function getLocalImages(handle: string): [string, string?] | undefined {
  return LOCAL_PRODUCT_IMAGES[handle];
}
