// フック＝関数コンポーネントにstateやライフサイクルなどの機能を接続する（hook into）ための機能
// React hooksにはuseState, useEffect, useContext, useReducer, useCallback, useMemo, useRefがあるが、useがつくもの！
import React, { useRef, useState} from 'react'
import { gql, useMutation } from '@apollo/client'
import { storeKeyNameFromField } from '@apollo/client/utilities'
import { resolveProjectReferencePath } from 'typescript';

import { GET_POST } from './Sample';
// import { useMutation } from '@apollo/react-hooks'
// import { useMutation } from '@apollo/react-hooks'
// inputのvalueにstateを入れてstate経由でユーザーから入力された値を取得する方法もあるがそれよりもスマートなのがuseRef！
import styles from '../styles/Home.module.css'

// 定義例 $typeをtype: ここ に代入している
// export const CREATE_POST = gql`
//   mutation CreatePost($type: String) {
//     createPost(type: $type) {
//       title
//       content
//     }
//   }
//   `

// mutation createPost {
//   title
//   content
// }
// これをconst CREATE_POSTの中に入れていたがこの書き方はv2だったぞ→関係なかった

// mutation {
//   createPost(title: String, $content: String)(
//     input:{
//       title: "title"
//       content: "description"
//     }
//   ){
//     post {
//       title
//       content
//     }
//   }
// }

  // } まさかのV2のだから動かない説あるぞ！！！！英語の動画と同じコードなら動くだろという幻想は捨てよ！！


// const CREATE_POST = gql`
//   mutation CreateCreatePost($title: String!, $content: String!) {
//     createPost(title: $title, content: $content) {
//       title
//       content
//     }
//   }
//  `;

// ↑をコピーしてmutationの定義を変更していく
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        title
        content
      }
    }
  }
 `;

// inputObjectを使ってもうまくいかないぞ！！
//  mutation CreatePost($CreatePostInput:CreatePostInput!) {
//   createPost(input: $CreateNewPostInput) {
//     post {
//       id
//       title
//       content
//     }
//   }
// }



// const CREATE_POST = gql`
//   mutation {
//     createPost(
//       title: $title
//       content: $content
//     ) post {
//         title
//         content
//     }
//   }
//  `;


// export function CreatePost() {
  export const CreatePost = () => {
  // function CreatePost () {
  // top-levelでのみフック（useStateとか）を呼び出す必要がある
  // const [createPost, {data, loading, error}] = useMutation(CREATE_POST);
  // let title, content;
  const [title, setTitle]  = useState('')
  const [content, setContent] = useState('')

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('')
  // <>で型を定義している
  const inputLengthZero = (): boolean => {
    if(title.length === 0 || content.length === 0) return true;
  }

  // const [createPost, {data}] = useMutation(CREATE_POST);
  const [createPost, {data, loading, error}] = useMutation(CREATE_POST, {
    refetchQueries: [
      GET_POST,
      'posts'
    ],
  })

  // if (loading) return '読み込んでるよ';
  // if (error) return 'エラー発生したよ';

  console.log(title+'定義部分のtitle')
  console.log(`${content}定義部分content`)
  // const handleClick = (title: String) {

  // }
  // preventDefault()で送信した時にリダイレクトをしないようにする
  // const handleClick = e => {
  //   e.preventDefault();

  // }

  // useRef（inputからvalueを取得するために使う）
  const inputTitleRef = useRef(null)
  const inputContentRef = useRef(null)
  // ↑なぜか取れない

  console.log(title+'state')
  
  const onSubmit = (e) => {
    // e.preventDefault();リダイレクトを防ぐやる必要のないことはやらない
    e.preventDefault();
    console.log(title+'⇦heyheyheyhey')
    createPost({ variables: { input: {title, content} } });
    setTitle('')
    setContent('')
  }
// JSON.stringify()

// デバッグはいつでも出力させること！Golangではfmt.Printf(%v, 出力したい変数名)でやっていたように
// フロントではconcole.log()
  return (
    <div className={styles.grid} style={{ margin: "auto" }}>
      <form onSubmit={onSubmit}> 
        <h3 style={{ textAlign: "center" }}>今日の学びをShare</h3>
        <p style={{ textAlign: "center" }}>title</p>
        <input
          ref={inputTitleRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='title'
          style={{ margin: 'auto', display: 'block' }}
        />
        <p style={{ textAlign: "center" }}>post</p>
        <input 
          ref={inputContentRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          className='content'
          style={{ textAlign: "center", display: 'block' }}
        />
        <button
          type="submit"
          disabled={inputLengthZero()}
          style={{ margin: '10px auto', display: 'block', padding: '10px' }}
          >share</button>
    </form>
    </div>

  )
}


