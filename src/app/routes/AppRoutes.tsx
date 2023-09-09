import { Route, Routes } from 'react-router-dom';
import { ChatPage } from '../../pages/chat';
import { HomePage } from '../../pages/home';
import { DefaultLayout } from '../../pages/_layouts/DefaultLayout';
import { TextPage } from '../../pages/text';
import { ResponsePage } from '../../pages/response';
import { CHAT_PAGE_ROUTE, HOME_PAGE_ROUTE, RESPONSE_PAGE_ROUTE, TEXT_PAGE_ROUTE } from './routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={CHAT_PAGE_ROUTE} element={<ChatPage />} />
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
        <Route path={RESPONSE_PAGE_ROUTE} element={<ResponsePage />} />
        <Route path={TEXT_PAGE_ROUTE} element={<TextPage />} />
      </Route>
    </Routes>
  );
};
