import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/main.css';
import '../styles/styles.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Toaster />
      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;
