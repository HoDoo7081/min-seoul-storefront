import cleansingGelCard     from "@/assets/products/cleansing-gel-card.jpg";
import cleansingGelCard2    from "@/assets/products/cleansing-gel-card-2.jpg";
import velvetCreamCard      from "@/assets/products/velvet-cream.jpg";
import velvetCreamCard2     from "@/assets/products/velvet-cream-card-2.jpg";
import essenceCard          from "@/assets/products/essence-card.jpg";
import essenceCard2         from "@/assets/products/essence-card-2.jpg";
import antiAgingCard        from "@/assets/products/anti-aging-card.jpg";
import antiAgingCard2       from "@/assets/products/anti-aging-card-2.jpg";
import homecareSeteCard     from "@/assets/products/homecare-set-card.jpg";
import proSetCard           from "@/assets/products/pro-set-card.jpg";
import gicleeCreámCard      from "@/assets/products/giclee-cream-card.jpg";
import gicleeCreámCard2     from "@/assets/products/giclee-cream-card-2.jpg";
import gicleeCleansingCard  from "@/assets/products/giclee-cleansing-card.jpg";
import gicleeCleansingCard2 from "@/assets/products/giclee-cleansing-card-2.jpg";
import gicleeBarrierCard    from "@/assets/products/giclee-barrier-card.jpg";
import dolidoTonerCard      from "@/assets/products/dolido-toner-card.jpg";

export const LOCAL_PRODUCT_IMAGES: Record<string, [string, string?]> = {
  "derma-sense-cleansing-gel":                   [cleansingGelCard,    cleansingGelCard2],
  "atp-nad-synergy-velvet-cream":                [velvetCreamCard,     velvetCreamCard2],
  "4gf-supreme-plumping-essence":                [essenceCard,         essenceCard2],
  "anti-aging-line-set":                         [antiAgingCard,       antiAgingCard2],
  "essential-home-care-set-set-of-9":            [homecareSeteCard,    undefined],
  "professional-care-set-set-of-10":             [proSetCard,          undefined],
  "the-clinic-ectoin-barrier-restorative-cream": [gicleeCreámCard2,    gicleeCreámCard],
  "the-clinic-ectoin-ph-balancing-gel-cleanser": [gicleeCleansingCard, gicleeCleansingCard2],
  "the-clinic-barrier-line":                     [gicleeBarrierCard,   undefined],
  "dolido-tea-tree-toner":                       [dolidoTonerCard,     undefined],
};

export function getLocalImages(handle: string): [string, string?] | undefined {
  return LOCAL_PRODUCT_IMAGES[handle];
}
