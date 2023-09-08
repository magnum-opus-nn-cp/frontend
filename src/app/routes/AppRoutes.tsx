import {Route, Routes} from 'react-router-dom';
import {ChatPage} from '../../pages/chat';
import {CHAT_PAGE_ROUTE, HOME_PAGE_ROUTE} from './routes';
import {HomePage} from '../../pages/home';
import {DefaultLayout} from '../../pages/_layouts/DefaultLayout';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={CHAT_PAGE_ROUTE} element={<ChatPage />} />
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
      </Route>

    </Routes>
  );
};

