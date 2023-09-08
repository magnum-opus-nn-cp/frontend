import { forwardRef, Ref, useId } from 'react';
import clsx from 'clsx';
import { ReactFCC } from '../../utils/ReactFCC';
import { IntrinsicPropsWithoutRef } from '../../utils/types';
import s from './Upload.module.scss';

export interface UploadButtonProps extends IntrinsicPropsWithoutRef<'input'> {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  // onChange?: (e: any) => void;
  // multiple?: boolean;
}

export const Upload = forwardRef(function Upload(props: UploadButtonProps, ref: Ref<HTMLInputElement>) {
  const { children, className, ...inputProps } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={clsx(s.Upload, className)}>
      {/*<UploadIcon className={s.UploadButton__icon} />*/}
      {children}
      <input className={s.Upload__input} type="file" id={id} ref={ref} {...inputProps} />
    </label>
  );
});
