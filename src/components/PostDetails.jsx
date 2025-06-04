import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const userRes = await axios.get(`https://jsonplaceholder.typicode.com/users/${postRes.data.userId}`)
        const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        const postsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${postRes.data.userId}&_limit=3`)

        setPost(postRes.data)
        setUser(userRes.data)
        setComments(commentsRes.data)
        setRelatedPosts(postsRes.data.filter(p => p.id !== parseInt(id)))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div className="loading">Loading post details...</div>
  if (!post) return <div className="not-found">Post not found</div>

  return (
    <div className="post-detail-layout">
      <div className="post-main-content">
        <Link to="/" className="back-link">← Back to all posts</Link>
        <h1>{post.title}</h1>
        <p className="post-body">{post.body}</p>
        
        {user && (
          <div className="author-section">
            <h2>About the author</h2>
            <div className="author-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        )}

        <div className="comments-section">
          <h2>Comments ({comments.length})</h2>
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <h3>{comment.name}</h3>
              <p className="comment-meta">{comment.email}</p>
              <p className="comment-text">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar">
        <div className="related-posts">
          <h2>More from {user?.name}</h2>
          {relatedPosts.map(post => (
            <div key={post.id} className="related-post">
              <Link to={`/post/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetails