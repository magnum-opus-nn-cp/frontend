import { ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';
import { Portal } from '../Portal';
import { usePreventWindowScroll } from '../../hooks/usePreventWindowScroll';
import s from './Modal.module.scss';

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isClosing?: boolean;
  preventWindowScroll?: false;
}

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, isClosing, preventWindowScroll } = props;

  const nodeRef = useRef(null);
  usePreventWindowScroll(preventWindowScroll ?? isOpen);

  return (
    <Portal>
      <Transition unmountOnExit nodeRef={nodeRef} timeout={200} in={isOpen && !isClosing}>
        {(state) => (
          <div ref={nodeRef} className={clsx(s.Modal, s[`Modal_${state}`], className)}>
            <div onClick={onClose} className={s.Modal__overlay} />
            <div className={s.Modal__content}>{isOpen && children}</div>
          </div>
        )}
      </Transition>
    </Portal>
  );
};
