import countriesData from "../data/countries.json"

const getRandomCapitals = (correctCapital) => {
  const allCapitals = countriesData.map((country) => country.capital)
  const uniqueCapitals = allCapitals.filter((capital) => capital !== correctCapital && capital !== '') // Exclude empty strings
  const randomCapitals = []
  while (randomCapitals.length < 3) {
    const randomIndex = Math.floor(Math.random() * uniqueCapitals.length)
    const randomCapital = uniqueCapitals[randomIndex]
    if (!randomCapitals.includes(randomCapital)) {
      randomCapitals.push(randomCapital)
    }
  }
  return randomCapitals
}

export const generateCapitals = (questionIndex) => {
  const currentQuestion = countriesData[questionIndex]
  const capitals = [
    currentQuestion.capital,
    ...getRandomCapitals(currentQuestion.capital)
  ].sort(() => Math.random() - 0.5)
  return capitals
}
