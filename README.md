# Coupon Admin Frontend

쿠폰 관리 시스템의 관리자용 프론트엔드 애플리케이션입니다.

## 🚀 시작하기

### 필수 요구사항

- **Node.js**: 18.0.0 이상
- **pnpm**: 9.0.0 이상 (권장 패키지 매니저)

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd coupon-admin-front
   ```

2. **의존성 설치**

   ```bash
   pnpm install
   ```

3. **Husky 설정** (Git hooks 활성화)

   ```bash
   pnpm prepare
   ```

4. **개발 서버 실행**

   ```bash
   pnpm dev
   ```

5. **브라우저에서 확인**

   [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📝 사용 가능한 스크립트

- `pnpm dev` - 개발 서버 실행 (Turbopack 사용)
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm lint` - ESLint 검사
- `pnpm lint:fix` - ESLint 자동 수정
- `pnpm type-check` - TypeScript 타입 체크
- `pnpm format` - Prettier 포맷팅
- `pnpm format:check` - Prettier 포맷 체크
- `pnpm orval` - API 코드 생성

## 🛠 기술 스택

### 프레임워크 & 라이브러리

- **Next.js 15** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성

### 상태 관리 & API

- **Zustand** - 전역 상태 관리
- **TanStack Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### UI 컴포넌트 & 유틸리티

- **TanStack Table** - 테이블 컴포넌트
- **Ant Design Icons** - 아이콘
- **Toast UI Editor** - 에디터
- **date-fns** - 날짜 유틸리티
- **jwt-decode** - JWT 토큰 디코딩
- **universal-cookie** - 쿠키 관리

### 개발 도구

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks
- **lint-staged** - 스테이징된 파일 검사
- **Commitlint** - 커밋 메시지 규칙
- **Orval** - API 코드 생성
