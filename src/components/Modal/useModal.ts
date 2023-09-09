import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  canClose?: boolean;
}
const ANIMATION_DURATION = 200;

export function useModal(props: UseModalProps) {
  const { isOpen, canClose: canCloseProp = true, onClose } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [canClose, setCanClose] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (canClose && canCloseProp && onClose) {
      onClose();
    }
  }, [canClose, canCloseProp, onClose]);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
      setModalIsVisible(true);
      timerRef.current = setTimeout(() => {
        setCanClose(true);
        window.addEventListener('keydown', onKeyDown);
      }, ANIMATION_DURATION);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }

    if (!isOpen) {
      setIsClosing(true);
      setCanClose(false);
      timerRef.current = setTimeout(() => {
        setModalIsVisible(false);
        setIsClosing(false);
      }, ANIMATION_DURATION);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    close,
    modalIsVisible,
    ANIMATION_DURATION
  };
}
