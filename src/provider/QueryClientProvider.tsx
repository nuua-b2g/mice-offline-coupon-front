'use client';

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: () => {
            // TODO: 토스트로 전역 에러 핸들링 추가
          },
        }),
        defaultOptions: {
          queries: {
            // 최신성
            staleTime: 5 * 60 * 1000, // 5분
            gcTime: 10 * 60 * 1000, // 10분
            refetchOnWindowFocus: false,
            refetchOnMount: false, // 마운트 시 리페치 비활성화
            refetchOnReconnect: false, // 네트워크 재연결 시 리페치 비활성화
          },
        },
      })
  );

  return <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>;
}
