// フック＝関数コンポーネントにstateやライフサイクルなどの機能を接続する（hook into）ための機能
import React, { useRef } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
// import { useMutation } from '@apollo/react-hooks'
// import { useMutation } from '@apollo/react-hooks'
// inputのvalueにstateを入れてstate経由でユーザーから入力された値を取得する方法もあるがそれよりもスマートなのがuseRef！


// 定義例 $typeをtype: ここ に代入している
// export const CREATE_POST = gql`
//   mutation CreatePost($type: String) {
//     createPost(type: $type) {
//       title
//       content
//     }
//   }
//   `

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
    }
  }
  `

// export function CreatePost() {
  export const CreatePost = () => {
  // top-levelでのみフック（useStateとか）を呼び出す必要がある
  // const [createPost, {data, loading, error}] = useMutation(CREATE_POST);
  // let title, content;
  const [createPost, {data}] = useMutation(CREATE_POST)

  // const handleClick = (title: String) {

  // }
  // preventDefault()で送信した時にリダイレクトをしないようにする
  // const handleClick = e => {
  //   e.preventDefault();

  // }

  // useRef（inputからvalueを取得するために使う）
  const inputTitleRef = useRef(null)
  const inputContentRef = useRef(null)
  console.log(inputTitleRef+'デバッグ')

// デバッグはいつでも出力させること！Golangではfmt.Printf(%v, 出力したい変数名)でやっていたように
// フロントではconcole.log()
  return (
    <div>
    <form
      onSubmit={e => {
        e.preventDefault();
        // console.log(e.target.text.value)
        console.log(inputTitleRef+'kぢ')
        createPost({ variables: { title: inputTitleRef, content: inputContentRef } });
        // useMutationを含む変数をここで使うのかな？？
      }}
    >
      <p>title</p>
      <input
        ref={inputTitleRef}
        className='title'
      />
      <p>post</p>
      <input 
        className='content'
        ref={inputContentRef}
      />
      <button type="submit">Add Todo</button>
    </form>
    </div>

  )
}


