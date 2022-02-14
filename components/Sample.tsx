// import React from 'react';
import { useQuery, gql } from "@apollo/client";
import styles from '../styles/Home.module.css'

export const GET_POST = gql`
  {
    posts {
      title
      content
    }
  }
`;

// default exportは避けた方がいいらしい
// const Sample = () => {

// 準備は定数、実行するのは関数！

  const Sample = () => {
    const {loading, error, data} = useQuery(GET_POST); // 解説します

    if (loading) return 'ロード中....';
    if (error) return `Error ${error.message}`;
    // デバッグ＝console.log(変数名 + "デバッグ")が基本であり奥義
    return (
      <>
      <div className={styles.container} style={{ margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>↓みんなの学び↓</h1>
        <div className={styles.grid}>

              {data.posts.map(post => (
              <div className={styles.card}>
                  <h1>{post.title}</h1>
                  <h2>{post.content}</h2>
              </div>
              // )})
              ))}
        </div>
      </div>


      </>
    )
};

// constで定義して関数で実行！！
const INCREMENT_COUNTER = gql`
  mutation CreatePost {
    createPost {
      title
      content
    }
  }
`;







export default Sample