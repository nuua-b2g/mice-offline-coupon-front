import { redirect } from 'next/navigation';

// TODO: JWT 추가 후 분기 추가 예정

// 임시: 홈 진입 시 쿠폰 목록으로 이동
export default function HomePage() {
  redirect('/coupon/list');
}
