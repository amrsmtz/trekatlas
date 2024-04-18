import * as React from "react"
import { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import countriesData from "../data/countries.json"
import "./guess-the-capital.css"

const GuessTheCapitalPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.floor(Math.random() * countriesData.length) + 1)
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const currentQuestion = countriesData[currentQuestionIndex]
  const capitals = [
    currentQuestion.capital,
    ...getRandomCapitals(currentQuestion.capital)
  ].sort(() => Math.random() - 0.5)

  const handleOptionClick = (capital) => {
    setSelectedCapital(capital)
    if (capital === currentQuestion.capital) {
      setShowSuccessMessage(true)
    }
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedCapital(null)
    setShowSuccessMessage(false)
  }

  return (
    <Layout>
      <h1>Guess the Capital</h1>
      <h2>{currentQuestion.name}</h2>
      <div class="clickable-options">
        {capitals.map((capital, index) => (
          <button key={index} onClick={() => handleOptionClick(capital)}>
            {capital}
          </button>
        ))}
      </div>
      <div class="success-message">
        {showSuccessMessage && (
          <p>Congratulations! You guessed it right!</p>
        )}
      </div>
      <div class="controls-section">
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    </Layout>
  )
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
