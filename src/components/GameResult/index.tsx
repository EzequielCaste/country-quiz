import React from 'react'
import { Link } from 'wouter'

interface Props {
  score: number
}

const GameResult: React.FC<Props> = ({ score }) => {
  return (
    <div>
      <h2>GameResult: {score}</h2>
      <Link href="/">Try Again</Link>
    </div>
  )
}

export default GameResult