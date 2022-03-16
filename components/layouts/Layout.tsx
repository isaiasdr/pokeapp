import { FC } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../ui';

interface LayoutProps {
    title?: string,
    description?: string,
};

export const Layout: FC<LayoutProps> = ({ children, title, description }) => {

    const basePath = (typeof window === 'undefined') ? '' : window.location.origin

    return (
        <>
            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name="author" content="Isaias Dominguez" />
                <meta name="description" content={`Informacion sobre el pokemon ${description || ''}`}/>
                <meta name="keywords" content={`${title}, pokemon, pokedex`}/>

                <meta property="og:title" content={`Informacion sobre ${ title }`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${ title }`} />
                <meta property="og:image" content={`${basePath}/images/banner.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px',
            }}>
                { children }
            </main>
        </>
    );
}
