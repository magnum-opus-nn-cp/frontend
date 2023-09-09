import { ReactNode } from 'react';
import clsx from 'clsx';
import { Modal } from '../Modal';
import s from './ModalContainer.module.scss';

export interface ModalContainerProps {
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  isClosing?: boolean;
  withBorderRadius?: boolean;
  preventWindowScroll?: false;
}

export const ModalContainer = (props: ModalContainerProps) => {
  const { isClosing, className, children, isOpen, onClose, withBorderRadius = true, preventWindowScroll } = props;

  return (
    <Modal
      className={clsx(s.ModalContainer, {})}
      onClose={onClose}
      isClosing={isClosing}
      isOpen={isOpen}
      preventWindowScroll={preventWindowScroll}>
      <div
        className={clsx(
          s.ModalContainer__wrapper,
          { [s.ModalContainer__wrapper_borderRadius]: withBorderRadius },
          className
        )}>
        <div className={s.ModalContainer__content}>{children}</div>
      </div>
    </Modal>
  );
};
