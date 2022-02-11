import '../styles/globals.css'
import client from '../apollo-client'

export default function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
 
}


// Layoutで囲むことにより全てのページで使うヘッダーやフッターを設定することが出来る！reffectのNext.jsの基礎を確認しよう！

// return (
//   <Layout>
//     <Component {...pageProps} />
//   </Layout>
// );


