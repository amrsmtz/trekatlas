import * as React from "react"
import { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import countriesData from "../data/countries.json"
import "./guess-the-capital.css"

const GuessTheCapitalPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.floor(Math.random() * countriesData.length))
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(0)
  const [capitals, setCapitals] = useState(generateCapitals(currentQuestionIndex))

  const currentQuestion = countriesData[currentQuestionIndex]

  const handleOptionClick = (capital) => {
    setSelectedCapital(capital)
    if (capital === currentQuestion.capital) {
      setShowSuccessMessage(1)
    } else {
      setCapitals(generateCapitals(currentQuestionIndex)) // Refresh capitals only for wrong answers
      setShowSuccessMessage(2)
    }
  }

  const handleNextQuestion = () => {
    const newQuestionIndex = Math.floor(Math.random() * countriesData.length)
    setCurrentQuestionIndex(newQuestionIndex)
    setSelectedCapital(null)
    setShowSuccessMessage(0)
    // Refresh capitals for the next question
    setCapitals(generateCapitals(newQuestionIndex))
  }

  return (
    <Layout>
      <h1>Guess the Capital</h1>
      <h2>{currentQuestion.name}</h2>

      <p>currentQuestionIndex: {currentQuestionIndex}</p>
      <p>selectedCapital: {selectedCapital}</p>
      <p>capital: {currentQuestion.capital}</p>

      <div className="clickable-options">
        {capitals.map((capital, index) => (
          <button key={index} onClick={() => handleOptionClick(capital)}>
            {capital}
          </button>
        ))}
      </div>
      <div className="message">
        {showSuccessMessage === 1 && (
          <p className="success">Congratulations! You guessed it right!</p>
        )}
        {showSuccessMessage === 2 && (
          <p className="failure">Oops! You guessed it wrong.</p>
        )}
      </div>
      <div className="controls-section">
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    </Layout>
  )
}

const generateCapitals = (questionIndex) => {
  const currentQuestion = countriesData[questionIndex]
  const capitals = [
    currentQuestion.capital,
    ...getRandomCapitals(currentQuestion.capital)
  ].sort(() => Math.random() - 0.5)
  return capitals
}

const getRandomCapitals = (correctCapital) => {
  const allCapitals = countriesData.map((country) => country.capital)
  const uniqueCapitals = allCapitals.filter((capital) => capital !== correctCapital && capital !== '') // Exclude empty strings
  const randomCapitals = []
  while (randomCapitals.length < 3) {
    const randomIndex = Math.floor(Math.random() * uniqueCapitals.length)
    const randomCapital = uniqueCapitals[randomIndex]
    if (randomCapital !== '' && !randomCapitals.includes(randomCapital)) { // Check if not empty string
      randomCapitals.push(randomCapital)
    }
  }
  return randomCapitals
}

export const Head = () => <Seo title="Guess the Capital" />

export default GuessTheCapitalPage
