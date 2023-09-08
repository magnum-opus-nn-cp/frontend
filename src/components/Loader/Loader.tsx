import { memo } from 'react';
import clsx from 'clsx';
import { ReactComponent as LoaderIcon } from '../../assets/icons/loader.svg';
import s from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
}

export const Loader = memo((props: LoaderProps) => {
  const { className } = props;

  return (
    <div className={clsx(s.Loader, className)}>
      <LoaderIcon className={clsx(s.LoaderIcon)} />
    </div>
  );
});

Loader.displayName = 'Loader';
