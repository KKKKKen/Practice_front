import React from 'react';
import { useQuery, gql } from "@apollo/client";


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

  const Sample = () => {
    const {loading, error, data} = useQuery(GET_POST); // 解説します

    if (loading) return 'ロード中....';
    if (error) return `Error ${error.message}`;

    return (
      <>
        <h1>こんにちは</h1>
        {data.posts.map(post => (
        <div>
            <h1>{post.tile}</h1>
            <h2>{post.content}</h2>
        </div>
        // )})
        ))}

      </>
    )
};

export default Sample