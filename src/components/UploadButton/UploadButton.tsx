import clsx from 'clsx';
import s from './UploadButton.module.scss';
import {ReactFCC} from '../../utils/ReactFCC';
import {Button, ButtonVariant} from '../Button';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';
import {useId} from 'react';

export interface UploadButtonProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  onChange?: (e: any) => void;
  multiple?: boolean;
}

export const UploadButton: ReactFCC<UploadButtonProps> = (props) => {
  const {className, onChange, multiple} = props;

  const id = useId();

  return (
    <Button component={'label'} htmlFor={id} className={clsx(s.UploadButton, className)} variant={ButtonVariant.secondary}>
      <UploadIcon className={s.UploadButton__icon} />
      <input
        className={s.UploadButton__input}
        type="file"
        id={id}
        onChange={onChange}
        multiple={multiple}
      />
    </Button>
  );
};

