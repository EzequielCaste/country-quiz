import { useRef, useState } from 'react'
import styled from 'styled-components'
import  {Link} from 'wouter'
import flagsData from '../../flag_data.json'
import { GData } from '../../types'
import { getRandomData, pickRandom } from '../../utils/helpers'
import GameResult from '../GameResult'

const FlagContainer = styled.div`
  width: 55px;  
`

const Image = styled.img`
width: 100%;
`

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
const Next = styled.div``

const FlagGame = () => {
  const [selected, setSelected] = useState('')
  const [flags, setFlags] = useState<GData[]>([])
  const [rngNumber, setRngnNumber] = useState<number>(0)
  const [game, setGame] = useState({
    status: 'waiting',
    score: 0
  })
  const [correctOption, setCorrectOption] = useState<GData | null>(null)

  const shouldGetCountry = useRef(true)

  const [showResults, setShowResults] = useState(false)

  if (shouldGetCountry.current) {
    shouldGetCountry.current = false
    getRandomData(setFlags, flagsData) 
    pickRandom(setRngnNumber)   
  }

  if (flags.length === 0) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const selectedOption = e.target.value
    setSelected(selectedOption)

    const answer = flags.filter(item => item.name === selectedOption)[0]

    if (answer.name === flags[rngNumber].name) {
      setGame(prev => ({
        status: 'correct',
        score: prev.score + 1
      }))      
    } else {
      setGame(prev => ({
        ...prev,
        status: 'incorrect'
      }))      
    }
    setCorrectOption(flags[rngNumber])
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

  function handleNext() {
    if (game.status === 'incorrect') {
      setShowResults(true)
    } else {
      getRandomData(setFlags, flagsData)
      setGame(prev => ({
        ...prev,
        status: 'waiting'      
      }))
    }
  }

  if (showResults) {
    return <GameResult game='flag' score={game.score} />
  }

  return (
    <div>
      <h2>Flag Game</h2>
      {/* TITLE */}
      <FlagContainer>
        <Image src={flags[rngNumber].flag} alt="Guess the Flag" />
      </FlagContainer>
      {/* FLAG https://restcountries.com/v2/all?fields=name,capital,flag */}
      {/* OPTIONS */}
      {
        flags.map(option => (
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
      <Link href="/">Back</Link>
    </div>
  )
}

export default FlagGame