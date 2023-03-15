import {useState} from 'react'
import capitals from '../../quiz_data.json'
import styled from 'styled-components'

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

const Input = styled.input`
-webkit-appearance: none;
  appearance: none;
  margin: 0;
`

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

const GameCard = () => {
  const [answer, setAnswer] = useState<string>('')
  const randomNumber = Math.floor(Math.random() * gameData.length)
  const correctAnswer = gameData[randomNumber]


  function checkAnswer(country: string) {
    setAnswer(country)
  }

  return (
    <Container>
      <Card>
        <h1>{correctAnswer.capital} is the capital of</h1>

        {gameData.map((option, index) => (
          <div key={option.name}>
          <Input 
            type="radio" 
            id={option.name} 
            name="country" 
            value={option.name} 
          />
          <label htmlFor={option.name}>{option.name}</label>
          </div>          
        ))}
      </Card>
    </Container>
  )
}

export default GameCard
{/* <Option key={option.name} onClick={() => checkAnswer(option.name)}>
            <span>{String.fromCharCode(65 + index)} </span>
            <span>{option.name}</span>
          </Option> */}