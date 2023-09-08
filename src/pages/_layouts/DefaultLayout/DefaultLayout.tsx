import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../utils/ReactFCC';
import cbrLogoSrc from './assets/cbr-logo.svg';
import cpLogoSrc from './assets/cp-logo.svg';
import mopusLogoSrc from './assets/mopus-logo.svg';
import s from './DefaultLayout.module.scss';

export const DefaultLayout: ReactFCC = () => {
  return (
    <div className={s.DefaultLayout}>
      <div className={s.DefaultLayout__container}>
        <header className={s.DefaultLayout__header}>
          <div className={s.DefaultLayout__logoMopusContainer}>
            <img className={s.DefaultLayout__logo} src={mopusLogoSrc} alt={''} />
          </div>
          <img className={clsx(s.DefaultLayout__logo, s.DefaultLayout__logo_cp)} src={cpLogoSrc} alt={''} />
          <img className={clsx(s.DefaultLayout__logo, s.DefaultLayout__logo_cbr)} src={cbrLogoSrc} alt={''} />
        </header>

        <div className={s.DefaultLayout__content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
