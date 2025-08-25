'use client';

import React from 'react';
import QueryClientProvider from './QueryClientProvider';
import { ModalProvider } from '../components/common/Modal/ModalProvider';
import { ToastProvider } from '../components/common/Toast/ToastProvider';

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProvider>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
