import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ProgressBar from "../components/progress-bar"
import RefreshButton from "../components/refresh-button"

import countriesData from "../data/countries.json"
import "./guess-the-capital.css"

const GuessTheCapitalPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.floor(Math.random() * countriesData.length))
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [showMessage, setShowMessage] = useState(0)
  const [capitals, setCapitals] = useState(generateCapitals(currentQuestionIndex))
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = countriesData[currentQuestionIndex]

  const handleOptionClick = (capital) => {
    setSelectedCapital(capital)
   
    if (round < 10) {
      if (capital === currentQuestion.capital) {
        setShowMessage(1)
        setTimeout(() => {
          let newQuestionIndex = Math.floor(Math.random() * countriesData.length)
          setCurrentQuestionIndex(newQuestionIndex)
          setSelectedCapital(null)
          setShowMessage(0)
          setCapitals(generateCapitals(newQuestionIndex))
          setScore(score + 1)
          setRound(round + 1)
        }, 1000)
      } else {
        setShowMessage(2)
        setTimeout(() => {
          setCapitals(generateCapitals(currentQuestionIndex))
          setShowMessage(0)
          setRound(round + 1)
        }, 1000)
      }
    } else {
      setShowResult(true)
    }
  }

  return (
    <Layout>
      <h1>Guess the Capital</h1>
      <h2>{currentQuestion.name}</h2>
      <div className="clickable-options">
        {capitals.map((capital, index) => (
          <button key={index} onClick={() => handleOptionClick(capital)}>
            {capital}
          </button>
        ))}
      </div>
      <ProgressBar progress={round*10} />
      <div className="message">
        {showMessage === 1 && !showResult && (
          <p className="success">Congratulations! You guessed it right!</p>
        )}
        {showMessage === 2 && !showResult && (
          <p className="failure">Oops! You guessed it wrong.</p>
        )}
        {showResult && (
          <>
            <p>You get a score of {score}/10 !</p>
            <div className="refresh-button">
              <RefreshButton />
            </div>
          </>
        )}
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
