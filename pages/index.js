import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { render } from 'react-dom';
import { ApolloProvider } from "@apollo/client"

// 手順としてまずはライブラリをインストールして → new ApolloClientでinitialize（初期化にはuri, cacheつまりデータの一時保存が必要）して、
// このファイルのコードはindex.js内に書いてもいいのかな？？分けた方が見やすいのか

// mutation
import client from '../apollo-client';
import Sample from '../components/Sample';

import gql from 'graphql-tag';

import { CreatePost } from '../components/cratePost';

// 手順 
// 1 ApolloClientの初期化
// 2 上の方にApolloProviderの設置
// 3 クエリの実行

// 1 ApolloClientの初期化
// （apollo.jsから読み込んでいるのでuseQueryを使う上では不要）
// import {
//   ApolloClient,
//   InMemoryCache,
// } from "@apollo/client";
// const client = new ApolloClient({
//   uri: 'http://localhost:3003/graphql',
//   cache: new InMemoryCache()
// });


//なぜかindex.jsじゃないとgqlが読み込まれない【仮説】gqlは{}が必要なのかな？？ 
// →named exportはdefaultを使わずにexportされてimportに{}必要らしい


//ApolloProviderをアプリ上方に設置するらしい
export default function App ({}) {
  return (
      <ApolloProvider client={client} >
         <div className={styles.container}>
           <Head>
             <title>Create Next App</title>
             <meta name="description" content="Generated by create next app" />
             <link rel="icon" href="/favicon.ico" />
           </Head>
           <main>
             <h1></h1>
            <CreatePost/>
           </main>
         </div>
          <Sample />
      </ApolloProvider>
  );
}

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;


// export const Sample = () => {
//   const {loading, error, data} = useQuery(GET_POST); // 解説します

//   if (loading) return 'ロード中....';
//   if (error) return `Error ${error.message}`;

//   return (
//     <>
//       {data.posts.map(post => (
//       <div>
//           <h1>{post.tile}</h1>
//           <h2>{post.content}</h2>
//       </div>
//       // )})
//       ))}
//     </>
//   )
    
// };


// export default function Home({ countries }) {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Thank you for comming to this page! <a href="https://nextjs.org">Next.js!</a>
//         </h1>

        
//       </main>

//       <main className={styles.main}>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
        
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }



// データを取ってくる関数はget系が3か4種類ある（今の理解では）getServerSidePropsはSSR, getStaticPropsはSSG, でClient Sideでデータを取る方法がある
// それに加えてuseQueryやSWRもある、SWRはstaleフロント側でデータを使いたい時に使うらしいがそもそもサーバーで見た目を作るのであれば不要じゃないかな
//useQueryを使うのがいい氣がする
// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },

