import React from 'react'
import { Link } from 'wouter'

interface Props {
  score: number
  game: 'flag' | 'capital'
}

const GameResult: React.FC<Props> = ({ score, game }) => {
  return (
    <div>
      <h2>GameResult: {score}</h2>
      <Link href="/">Try Again</Link>
    </div>
  )
}

export default GameResult