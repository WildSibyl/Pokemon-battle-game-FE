import { useEffect, useRef } from "react";

export const useModalCleanup = (modalOpen, cleanupFn) => {
  const prevModalOpen = useRef();

  useEffect(() => {
    if (prevModalOpen.current && !modalOpen) {
      cleanupFn();
    }
    prevModalOpen.current = modalOpen;
  }, [modalOpen, cleanupFn]);
};
