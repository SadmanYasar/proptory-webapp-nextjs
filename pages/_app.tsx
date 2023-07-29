import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { reducer, StateProvider } from '@/state';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider reducer={reducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;