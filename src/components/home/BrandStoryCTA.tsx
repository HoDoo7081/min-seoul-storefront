import { Link } from "@tanstack/react-router";

export function BrandStoryCTA() {
  return (
    <section
      className="w-full text-white"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[480px]">
          <img
            src="https://placehold.co/800x600/1a1a1a/c9a96e?text=Our+Story"
            alt="Selvé atelier"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-20 md:py-20">
          <p
            className="text-[12px] uppercase text-accent"
            style={{ letterSpacing: "0.2em" }}
          >
            OUR STORY
          </p>
          <h2 className="mt-3 font-heading text-[32px] leading-tight text-white md:text-[40px]">
            K-Beauty를 세계로
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.8] text-white/70">
            Selvé은 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아
            시장에 소개합니다.
          </p>
          <div className="mt-8">
            <Link
              to="/pages/about"
              className="inline-block rounded-[4px] border border-white px-7 py-3 text-sm text-white transition-colors duration-[250ms] hover:bg-white hover:text-foreground"
            >
              브랜드 소개 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
