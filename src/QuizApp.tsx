import React from 'react'
import {Route, Link} from 'wouter'

const QuizApp = () => {
  return (
    <>
      <h1>QuizApp</h1>
      <Link href='/capital'>
        Capital Game
      </Link>
      <Link href='/flag'>
        Flag Game
      </Link>
    </>
  )
}

export default QuizApp