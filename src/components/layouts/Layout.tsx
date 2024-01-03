import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { NavBar } from '../ui';

interface Props {
  title?: string;
  children?:ReactNode;
  thumbnail?:string;
  name?:string;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const Layout: FC<Props> = ({ children, title, thumbnail, name }) => {
  
  return (
      <>        
          <Head>
            <title>{ title || 'Checkout' }</title>
            <meta name="author" content="Dropi" />
            <meta name="description" content={`Checkout de ordenes ${ title }`} />
            <meta name="keywords" content={ `${ title }`} />
            <meta property="og:title" content={`${name}`} />
            <meta property="og:description" content="Checkout para procesar la orden de tus productos" />
            <meta property="og:image" content={`${thumbnail}`} />

        </Head>        
      
        <NavBar />

        <main style={{
          padding: '0px 20px',
          minHeight: "calc(100vh - 64px)"
        }}>
            { children }
        </main>
      
      </>
  )
};