import { GData } from "../types";

export const OPTIONS_AMOUNT = 4
export const STARTING_POINT = 55

function shuffleArray(arr: GData[]) {
  return arr.sort(() => 0.5 - Math.random())
}


export function getRandomData(callbackFn: React.Dispatch<React.SetStateAction<GData[]>>, filteredArray: GData[]) {
  // shuffle the countries in random order
  const shuffledData = shuffleArray(filteredArray)
  // grab 4 countries for the game
  const gameData = shuffledData.splice(STARTING_POINT, OPTIONS_AMOUNT)
  callbackFn(gameData)
  return
}

export function pickRandom(callbackFn: React.Dispatch<React.SetStateAction<number>>) {
  const randomNumber = Math.floor(Math.random() * OPTIONS_AMOUNT)
  callbackFn(randomNumber)
}