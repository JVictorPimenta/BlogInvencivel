import { Routes, Route } from 'react-router-dom'
import PostsList from './components/PostsList'
import PostDetails from './components/PostDetails'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </div>
  )
}

export default App