import {useState, useEffect, useRef} from 'react'
import {Link} from 'wouter'
import styled from 'styled-components'
// components
import GameResult from '../GameResult'
// types
import { GData } from '../../types'
// data (replace when doing actual FETCH)
import capitals from '../../quiz_data.json'
// helper function
import { getRandomData, pickRandom } from '../../utils/helpers'

const Next = styled.div``

// filter countries without a Capital
const filteredData = capitals.filter((e) => e.capital)

const Option = styled.div`
  margin-bottom: 1rem;
`

const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
`

const Label = styled.label`
`;

const H3 = styled.h3`
margin: 8px 0;
`;


const CapitalGame = () => {
  const [selected, setSelected] = useState('')
  const [countries, setCountries] = useState<GData[]>([])
  const [rngNumber, setRngnNumber] = useState<number>(0)
  const [game, setGame] = useState({
    status: 'waiting',
    score: 0
  })
  const [correctOption, setCorrectOption] = useState<GData | null>(null)

  const shouldGetCountry = useRef(true)

  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (shouldGetCountry.current) {
      shouldGetCountry.current = false

      // list of countries
      getRandomData(setCountries, filteredData)
      // pick one random correct answer
      pickRandom(setRngnNumber)
      
    }
  }, [])

  if (countries.length === 0) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    /* 
    here we should verify if answer is CORRECT    
    */
    const selectedOption = e.target.value
    setSelected(selectedOption)

    const answer = countries.filter(item => item.name === selectedOption )[0]

    if (answer.capital === countries[rngNumber].capital) {
      // true CORRECT
      setGame(prev => ({
        status: 'correct',
        score: prev.score + 1
      }))      

    } else {
      // false INCORRECT
      setGame(prev => ({
        ...prev,
        status: 'incorrect'
      }))

      // find the correct Country
      
    }
    setCorrectOption(countries[rngNumber])
  }

  function handleNext() {
    if (game.status === 'incorrect') {
      setShowResults(true)
    } else {
      getRandomData(setCountries, filteredData)
      setGame(prev => ({
        ...prev,
        status: 'waiting'      
      }))
    }
  }

  const labelColor = (option: string) => {
    switch (game.status) {
      case 'correct':
        if (option === selected) return 'green'
        return ''
      case 'incorrect':
        if (option === selected) return 'red'
        if (option === correctOption?.name) return 'orange'
        return ''    
      default:
        return ''
    }
  }
  
  if (showResults) {
    return <GameResult game='capital' score={game.score} />
  }

  return (
    <div>
      {/* Capital Header */}
      <h2>Capital Game</h2>
      <H3>{countries[rngNumber].capital} is the capital of</H3>
      {/* map options */}
      {
        countries.map(option => (
          <Option key={option.name}>
            <Input
            type="radio"
            id={option.name}
            name="country"
            value={option.name}
            checked={selected === option.name}
            onChange={handleChange}
            disabled={game.status !== 'waiting'}
          />
          <Label
            id={option.name}
            style={{
              backgroundColor: `${labelColor(option.name)}`
            }}
            htmlFor={option.name}
          >
            {option.name}
          </Label>
          </Option>
        ))
      }

      {
        game.status !== 'waiting' && <Next onClick={handleNext}>Next</Next>
      }
      
      <Link href='/'>Back</Link>
    </div>
  )
}

export default CapitalGame
