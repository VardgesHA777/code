import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../requests/reqeusts";

const Posts = () => {
  const { id } = useParams()
    const [ posts, setPosts ] = useState([])
    // const [date, setDate] = useState(new Date())
    const [initialPosts, setInitialPosts] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await getUserPosts({userId: id})
            setPosts(response.data)
            setInitialPosts(response.data)
            setLoading(false)
        })()
    },[])

    const removeSpecificPost = useCallback(({id}) => {
        const updatedPostsLocal = [...posts].filter(i => i.id !== id)
        setPosts(updatedPostsLocal)
    },[posts])

    const filterPosts = (event) => {
      const {value} = event.target;
      if (!value.length) return setPosts(initialPosts)
      const filteredPostsBasedOnSearch = [...posts].filter(i => i.title.includes(value))
        setPosts(filteredPostsBasedOnSearch)
    }

  return (
      <div className='posts-wrapper'>
          <input type='text' onChange={(event) => filterPosts(event)}/>
          {loading ? <div>Loading</div> : <>{posts.length ? posts.map(post => {
              return <div className='posts' key={post.id}>
                  <div className='individual-post'>
                      <div className='post-title'>Title: {post.title}</div>
                      <div className='delete-btn' onClick={() => removeSpecificPost({id: post.id})}>Delete</div></div>
              </div>
          }) : <div>No Data</div>}</>}
      </div>
  );
};

export default Posts;
