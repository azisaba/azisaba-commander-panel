import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth";
import Head from "next/head";

export default function MyApp({
                                  Component,
                                  pageProps,
                              }: AppProps<{
    session: Session;
}>) {
    return (
        <SessionProvider session={pageProps.session}>
            <>
                <Head>
                    <title>Azisaba Commander</title>
                </Head>
                <Component {...pageProps} />
            </>
        </SessionProvider>
    )
}