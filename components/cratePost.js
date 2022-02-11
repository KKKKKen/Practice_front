import { gql, useMutation } from '@apollo/client'

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

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;


  // const handleClick = (title: String) {

  // }

  handleClick(){
    this.create_post()
  }




  return (
    <div>
    <form
      onSubmit={e => {
        e.preventDefault();
        CreatePost({
           variables: { 
             title: input.value,
             content: input.value
            } });
        input.value = '';
      }}
    >
      <p>title</p>
      <input
        className='title'
      />
      <p>post</p>
      <input 
        className='content'
      />
      <button type="submit" onClick='{this.handleClick}'>Add Todo</button>
    </form>
    </div>

  )
}


