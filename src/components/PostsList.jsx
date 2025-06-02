import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/users'),
        ])
        
        setPosts(postsResponse.data)
        setUsers(usersResponse.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId)
    return user ? user.name : 'Unknown Author'
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="posts-container">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>Author: {getUserName(post.userId)}</p>
        </div>
      ))}
    </div>
  )
}

export default PostsList

