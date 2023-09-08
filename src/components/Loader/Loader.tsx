import { memo } from 'react';
import clsx from 'clsx';
import s from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assets/icons/loader.svg';

// export enum LoaderSize {
//   /**
//    * Размер лоадера 20х20
//    */
//   small = 'small',
//   /**
//    * Размер лоадера 30х30
//    */
//   medium = 'medium',
//   /**
//    * Размер лоадера 40х40
//    */
//   large = 'large'
// }

export interface LoaderProps {
  className?: string;
}

export const Loader = memo((props: LoaderProps) => {
  const { className } = props;

  return (
    <div className={clsx(s.Loader, className)}>
      <LoaderIcon className={clsx(s.LoaderIcon)}  />
    </div>
  );
});

Loader.displayName = 'Loader';
