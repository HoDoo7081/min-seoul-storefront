import detailFull from "@/assets/pdp/face-fit-tox/detail-full.png";

export function FaceFitToxStory({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-[860px] px-5 pb-16 md:px-10">
      <img
        src={detailFull}
        alt={title}
        className="block w-full"
      />
    </section>
  );
}
