import { ModalStateProps } from '@/lib/types';
import { create } from 'zustand';

export const useJobApplicationModal = create<ModalStateProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
