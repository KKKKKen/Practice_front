import {
  ApolloClient,
  InMemoryCache,
  // gql
} from "@apollo/client";
// 手順としてまずはライブラリをインストールして → new ApolloClientでinitialize（初期化にはuri, cacheつまりデータの一時保存が必要）して、
// このファイルのコードはindex.js内に書いてもいいのかな？？分けた方が見やすいのか
// const client = new ApolloClient({
//     uri: "https://countries.trevorblades.com",
//     cache: new InMemoryCache()
// });

// 実際のデータの取得
const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql',
  cache: new InMemoryCache()
});

export default client;