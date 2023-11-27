import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { NavBar } from '../ui';

interface Props {
  title?: string;
  children?:ReactNode;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const Layout: FC<Props> = ({ children, title }) => {


  return (
      <>
        <Head>
            <title>{ title || 'Checkout' }</title>
            <meta name="author" content="Dropi" />
            <meta name="description" content={`Checkout de ordenes ${ title }`} />
            <meta name="keywords" content={ `${ title }`} />

        </Head>
      
        <NavBar />

        <main style={{
          padding: '0px 20px',
          height:'100vh'
        }}>
            { children }
        </main>
      
      </>
  )
};