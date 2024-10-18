import { ModalStateProps } from '@/lib/types';
import { create } from 'zustand';

export const useShareModal = create<ModalStateProps>((set) => ({
  isOpen: false,
  currentJobId: null,
  currentJobTitle: null,
  onOpen: (jobId, jobTitle) =>
    set({ isOpen: true, currentJobId: jobId, currentJobTitle: jobTitle }),
  onClose: () =>
    set({ isOpen: false, currentJobId: null, currentJobTitle: null }),
}));
