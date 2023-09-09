import { memo } from 'react';
import clsx from 'clsx';
import { ReactFCC } from '../../../utils/ReactFCC';
import s from './ModalBody.module.scss';

export interface ModalBodyProps {
  className?: string;
}

export const ModalBody: ReactFCC<ModalBodyProps> = memo((props) => {
  const { children, className } = props;

  return <div className={clsx(s.ModalBody, className)}>{children}</div>;
});
ModalBody.displayName = 'ModalBody';
