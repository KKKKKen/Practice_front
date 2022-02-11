import { gql, useMutation } from '@apollo/client'
// inputのvalueにstateを入れてstate経由でユーザーから入力された値を取得する方法もあるがそれよりもスマートなのがuseRef！
import React, { useRef } from 'react'

// 定義
export const CREATE_POST = gql`
  mutation CreatePost($title: String, $content:String) {
    createPost(title: $title) {
      title
      content
    }
  }
  `

export function CreatePost() {
  const [createPost, {data, loading, error}] = useMutation(CREATE_POST);

  // const handleClick = (title: String) {

  // }
  // preventDefault()で送信した時にリダイレクトをしないようにする
  const handleClick = e => {
    e.preventDefault();


  }

  // useRef（inputからvalueを取得するために使う）
  const inputTitleRef = useRef(null)
  const inputContentRef = useRef(null)


// デバッグはいつでも出力させること！Golangではfmt.Printf(%v, 出力したい変数名)でやっていたように
// フロントではconcole.log()
  return (
    <div>
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log(e.target.text.value)
        CreatePost({ variables: { type: inputTitleRef } });
        input.value = '';
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


