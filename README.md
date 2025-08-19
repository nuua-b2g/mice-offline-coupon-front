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
