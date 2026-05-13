import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import ProductDetailPage from "@/pages/ProductDetailPage";

export const Route = createFileRoute("/products/$handle")({
  component: RouteCmp,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
        <h1 className="text-[20px] font-semibold">제품 페이지를 표시할 수 없습니다</h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {error?.message ?? "알 수 없는 오류"}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-foreground px-4 py-2 text-[13px] text-background"
          >
            다시 시도
          </button>
          <Link
            to="/collections/$brandHandle"
            params={{ brandHandle: "all" }}
            className="rounded-md border border-border px-4 py-2 text-[13px]"
          >
            제품 목록으로
          </Link>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
      <h1 className="text-[20px] font-semibold">제품을 찾을 수 없습니다</h1>
      <Link
        to="/collections/$brandHandle"
        params={{ brandHandle: "all" }}
        className="mt-6 inline-block rounded-md border border-border px-4 py-2 text-[13px]"
      >
        제품 목록 보기
      </Link>
    </div>
  ),
});

function RouteCmp() {
  const { handle } = Route.useParams();
  return <ProductDetailPage handle={handle} />;
}
