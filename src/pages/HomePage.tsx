import { HeroPanels } from "@/components/home/HeroPanels";
import { CategoryDuo } from "@/components/home/CategoryDuo";
import { AboutBlock } from "@/components/home/AboutBlock";
import { TaiwanEzWayPopup } from "@/components/common/TaiwanEzWayPopup";

// Visual layout follows the Figma "Home Main" frame.
// GNB and Footer are mounted globally in src/routes/__root.tsx.
export default function HomePage() {
  return (
    <>
      <HeroPanels />
      <CategoryDuo />
      <AboutBlock />
      <TaiwanEzWayPopup />
    </>
  );
}
