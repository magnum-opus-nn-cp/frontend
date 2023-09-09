import { Link, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../utils/ReactFCC';
import { HOME_PAGE_ROUTE } from '../../../app/routes';
import cbrLogoSrc from './assets/cbr-logo.png';
import cpLogoSrc from './assets/cp-logo.png';
import mopusLogoSrc from './assets/mopus-logo.png';
import s from './DefaultLayout.module.scss';

export const DefaultLayout: ReactFCC = () => {
  return (
    <div className={s.DefaultLayout}>
      <div className={s.DefaultLayout__container}>
        <header className={s.DefaultLayout__header}>
          <Link to={HOME_PAGE_ROUTE} className={s.DefaultLayout__logoMopusContainer} reloadDocument>
            <img className={clsx(s.DefaultLayout__logo, s.DefaultLayout__logo_mopus)} src={mopusLogoSrc} alt={''} />
          </Link>
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
