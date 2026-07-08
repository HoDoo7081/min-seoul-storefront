# minseoul.com 자체 회원 시스템 구축 계획

## 목표
Shopify 고객 계정 대신 minseoul.com에서 자체 회원가입/로그인/프로필/주문내역을 관리. Shopify는 결제만 담당.

---

## 1. 데이터베이스 (Lovable Cloud)

기존 `profiles` 테이블 확장:
- `full_name` (있음)
- `email` (있음)
- `phone` 추가
- `shipping_address_line1`, `shipping_address_line2` 추가
- `shipping_city`, `shipping_postal_code`, `shipping_country` 추가

RLS: 본인만 조회/수정 가능

---

## 2. 인증 (Auth)

- 이메일/비밀번호 + Google 로그인 활성화
- `/auth` 페이지: 로그인/회원가입 탭 UI
- 회원가입 시 트리거로 `profiles` 자동 생성 (이미 있음)
- `_authenticated` 레이아웃으로 보호 라우트 구성

---

## 3. 페이지 구성

- **`/auth`** — 로그인/회원가입 (공개)
- **`/account`** — 계정 대시보드 (프로필 + 주문내역 요약)
- **`/account/profile`** — 이름/전화/배송지 편집
- **`/account/orders`** — Shopify 주문 목록
- **`/account/orders/:id`** — 주문 상세

GNB에 로그인 상태에 따라 "로그인" ↔ "내 계정" 표시

---

## 4. 체크아웃 연동

로그인된 사용자가 체크아웃 시:
- Shopify Cart에 사용자 email/이름/배송지를 buyerIdentity로 미리 채워서 전달
- Shopify 고객 계정 로그인 필요 없음 (게스트 체크아웃으로 처리)
- 사용자 경험: 사이트 로그인 → 장바구니 → 체크아웃 (Shopify 페이지에 정보 자동 입력됨)

---

## 5. 주문 내역 (Shopify Admin API)

서버 함수로 Shopify Admin API 호출:
- 로그인된 사용자 이메일로 Shopify에서 해당 주문 조회
- `/account/orders`에 목록 표시 (주문번호, 날짜, 금액, 상태)
- `/account/orders/:id`에 상세 (상품, 배송지, 결제, 배송 추적)

**중요**: Shopify에서 매칭은 **이메일 기준**. 회원가입 이메일과 체크아웃 이메일이 같아야 함 (자동 채우기로 보장).

---

## 6. Shopify Admin 정리 (사용자가 직접)

이 구축 완료 후, Shopify Admin에서:
- `pureveseoul.com` 도메인 제거
- 고객 계정 페이지는 사용 안 함 (설정만 정리)

---

## 기술 세부사항

- **Auth**: Supabase Auth (Lovable Cloud), `lovable.auth.signInWithOAuth("google")`
- **보호 라우트**: `src/routes/_authenticated/` (integration-managed)
- **주문 조회**: `createServerFn` + Shopify Admin API `/orders.json?email=`
- **Cart buyerIdentity**: Storefront API `cartBuyerIdentityUpdate` mutation
- **필요 마이그레이션**: `profiles` 테이블에 배송지/전화 컬럼 추가

---

## 진행 순서

1. DB 마이그레이션 (profiles 확장)
2. Google OAuth 활성화
3. `/auth` 페이지
4. `_authenticated` 레이아웃 + `/account` 페이지들
5. GNB 로그인 상태 표시
6. Cart buyerIdentity 연동
7. Shopify Admin API 주문 조회 서버 함수 + 주문 페이지

승인해주시면 순서대로 진행하겠습니다.
