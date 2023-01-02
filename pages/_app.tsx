import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {Session} from "next-auth";
import App from "next/app";

export default function MyApp({
                                  Component,
                                  pageProps,
                              }: AppProps<{
    session: Session;
}>) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

MyApp.getInitialProps = async (appContext: AppProps) => {
    // @ts-ignore
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps }
}