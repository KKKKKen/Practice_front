import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String, $content: String) {
    addBlogPost(title: $title, content: $content) {
      title
      content
    }
  }
`;