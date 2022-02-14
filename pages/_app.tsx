import '../styles/globals.css'
import client from '../apollo-client'
import Layout from '../components/layout'


export default function MyApp({ Component, pageProps }) {
  return   <Layout><Component {...pageProps} /></Layout>
}


// Layoutで囲むことにより全てのページで使うヘッダーやフッターを設定することが出来る！reffectのNext.jsの基礎を確認しよう！

// return (
//   <Layout>
//     <Component {...pageProps} />
//   </Layout>
// );


