import 'antd/dist/antd.css';
import Head from 'next//head';

export default function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>CRM系统</title>
                <meta key="description" name="description" content="crm" />
                <meta key="description" name="description" content="crm" />
            </Head>
            <Component {...pageProps} />
        </React.Fragment>
    )
}