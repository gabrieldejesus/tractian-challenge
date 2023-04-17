import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

// contexts
import { DefaultProvider } from '@/contexts/DefaultContext';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${
    router.pathname === '/' ? '' : router.pathname
  }`;

  return (
    <>
      <DefaultSeo
        title="Tractian Challenge"
        description="A Front End Software Engineer challenge to Tractian company."
        canonical={canonicalUrl}
        themeColor="#007aff"
        openGraph={{
          type: 'website',
          title: 'Tractian Challenge',
          description:
            'A Front End Software Engineer challenge to Tractian company.',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          images: [
            {
              width: 1200,
              height: 630,
              type: 'image/png',
              alt: 'Tractian Challenge',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/open-graph.png`,
              secureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/images/open-graph.png`,
            },
          ],
          siteName: 'Tractian Challenge',
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />

      <DefaultProvider>
        <Component {...pageProps} />
      </DefaultProvider>
    </>
  );
}
