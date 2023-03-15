import {useState, useEffect, useRef, SetStateAction} from 'react'
import {Link} from 'wouter'
import capitals from '../../quiz_data.json'
import styled from 'styled-components'

const Next = styled.div``
const OPTIONS_AMOUNT = 4

// filter countries without a Capital
const filteredData = capitals.filter((e) => e.capital)

function getRandomCountry(callbackFn: React.Dispatch<SetStateAction<GData[]>>) {
  // shuffle the countries in random order
  const shuffledData = filteredData.sort(() => 0.5 - Math.random())
  // grab 4 countries for the game
  const countries = shuffledData.splice(55, OPTIONS_AMOUNT)
  callbackFn(countries)
  return
}

interface GData {
  name: string
  capital?: string
  independent: boolean
  flag: string
}

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


const index = () => {
  const [selected, setSelected] = useState('')
  const [countries, setCountries] = useState<GData[]>([])
  const [rngNumber, setRngnNumber] = useState<number>(0)
  const [game, setGame] = useState({
    status: 'waiting'
  })
  const [correctOption, setCorrectOption] = useState<GData | null>(null)

  const shouldGetCountry = useRef(true)

  useEffect(() => {
    if (shouldGetCountry.current) {
      shouldGetCountry.current = false

      // list of countries
      getRandomCountry(setCountries)
      // pick one random correct answer
      const randomNumber = Math.floor(Math.random() * OPTIONS_AMOUNT)
      setRngnNumber(randomNumber)
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
      setGame({
        status: 'correct'
      })      

    } else {
      // false INCORRECT
      setGame({
        status: 'incorrect'
      })

      // find the correct Country
      
    }
    setCorrectOption(countries[rngNumber])
  }

  function handleNext() {
    console.log('handle next')
    getRandomCountry(setCountries)
    setGame({
      status: 'waiting'
    })
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

  return (
    <div>
      {/* Capital Header */}
      <h2>Capital Game</h2>
      <h1>{countries[rngNumber].capital} is the capital of</h1>
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
              backgroundColor: `${labelColor(option.name)}
              
              `
            }}
            htmlFor={option.name}
          >
            {option.name}
          </Label>
          </Option>
        ))
      }
      <Next onClick={handleNext}>Next</Next>
    </div>
  )
}

export default index
