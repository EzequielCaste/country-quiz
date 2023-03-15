import {useState} from 'react'
import styled from 'styled-components'
import GameCard from './components/GameCard'

import capitals from './quiz_data.json'

const numberOfCapitals = capitals.length // 250

const gameData: {
  name: string
  capital?: string
  independent: boolean
  flag: string
}[] = []

Array(1, 2, 3, 4).map(() => {
  const randomNumber = Math.floor(Math.random() * numberOfCapitals)
  const randomItem = capitals[randomNumber]

  gameData.push(randomItem)
})

const Container = styled.div`
  color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justiy-content: center;
  align-items: center;
`
const Card = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justiy-content: center;
  align-items: center;
`
const Button = styled.button`
  width: 150px;
`

const Option = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  width: 80%;
  background-color: #ccc;
  color: #000;
`
const Flag = styled.img`
  height: 24px;
  width: 24px;
`

enum gameTypes {
  None = '',
  Capital = 'capital',
  Flag = 'flag',
}
interface Game {
  type: gameTypes
}

const Quiz = () => {
  const [game, setGame] = useState<Game>({
    type: gameTypes.None,
  })
  const [score, setScore] = useState<number>(0)

  function changeGameType(type: gameTypes) {
    setGame({
      type,
    })
  }

  if (game.type === gameTypes.Capital) {
    return (
      <>
        <GameCard />
        <Button
            onClick={() =>
              setGame({
                type: gameTypes.None,
              })
            }
          >
            Back
          </Button>
      </>
    )
  }

  if (game.type === gameTypes.Flag) {
    const randomNumber = Math.floor(Math.random() * gameData.length)
    const correctAnswer = gameData[randomNumber]

    function checkAnswer(flag: string) {
      console.log('checking', correctAnswer.flag === flag)
    }
    return (
      <Container>
        <Card>
          <h1><Flag src={correctAnswer.flag} /> belongs to which country?</h1>
          {gameData.map((option, index) => (
            <Option key={option.name} onClick={() => checkAnswer(option.flag)}>
              <span>{String.fromCharCode(65 + index)} </span>
              <span>{option.name}</span>
            </Option>
          ))}
          <button
            onClick={() =>
              setGame({
                type: gameTypes.None,
              })
            }
          >
            Back
          </button>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <Card>
        <Button onClick={() => changeGameType(gameTypes.Capital)}>
          Capital
        </Button>
        <Button onClick={() => changeGameType(gameTypes.Flag)}>Flag</Button>
      </Card>
    </Container>
  )
}

export default Quiz
