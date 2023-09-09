import React from 'react';
import { Helmet } from 'react-helmet';
import { AppRoutes } from './routes';

export function App() {
  return (
    <>
      <Helmet title={'Press-release analyzer'}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      <AppRoutes />
    </>
  );
}
