import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';
import { darktheme } from '../themes';


type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? (( page ) => page);

    return (
        <NextUIProvider theme={ darktheme }>
            { getLayout(<Component {...pageProps} />) }
        </NextUIProvider>
    );
};

export default MyApp
