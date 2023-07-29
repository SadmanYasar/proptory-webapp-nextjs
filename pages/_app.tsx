import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { reducer, StateProvider } from '@/state';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <StateProvider reducer={reducer}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </SessionProvider>
  );
}

export default MyApp;