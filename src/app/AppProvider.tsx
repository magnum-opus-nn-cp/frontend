import {FC, PropsWithChildren} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ReactQueryProvider} from './providers';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </BrowserRouter>
  )
}