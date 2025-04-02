import React from 'react'
import { useParams } from 'react-router'

const About = () => {
  const p = useParams();
  console.log(p)
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

export default About
