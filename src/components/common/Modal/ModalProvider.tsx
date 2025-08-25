'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import Modal, { ModalProps } from './Modal';

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

interface ModalOptions extends Omit<ModalProps, 'isOpen' | 'children' | 'onClose'> {
  content: React.ReactNode;
  onClose?: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    options: ModalOptions | null;
  }>({
    isOpen: false,
    options: null,
  });

  const openModal = useCallback((options: ModalOptions) => {
    setModalState({
      isOpen: true,
      options,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.isOpen &&
        modalState.options &&
        (() => {
          const { content, onClose, ...restOptions } = modalState.options;
          return (
            <Modal isOpen={modalState.isOpen} onClose={onClose ?? closeModal} {...restOptions}>
              {content}
            </Modal>
          );
        })()}
    </ModalContext.Provider>
  );
};
