import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Container, Navbar } from 'react-bootstrap';
import styles from '@/styles/App.module.css';
import NextNProgress from "nextjs-progressbar";
import NavBar from '@/components/NavBar';


const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title key='title'>NextJS News App</title>
        <meta name="description" key='description' content="nextjs crash course by coding in flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress />
      <NavBar />
      <Container className={styles.pageContainer}>
        <Component {...pageProps} />
      </Container>
      
    </div>
  );
}
