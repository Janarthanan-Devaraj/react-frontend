import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <br />
        <Link to="/login">login</Link>
    </div>
  )
}

export default Home