import * as React from "react"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import countriesData from "../data/countries.json"
import { generateCapitals } from "../utils/capitals"
import "./guess-the-capital.css"

const GuessTheCapitalPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null)
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [showMessage, setShowMessage] = useState(0)
  const [capitals, setCapitals] = useState([])

  // The question is picked after mount: using Math.random() in the initial
  // state would make the client disagree with the build-time HTML (hydration mismatch)
  useEffect(() => {
    const questionIndex = Math.floor(Math.random() * countriesData.length)
    setCurrentQuestionIndex(questionIndex)
    setCapitals(generateCapitals(questionIndex))
  }, [])

  const currentQuestion = currentQuestionIndex === null ? null : countriesData[currentQuestionIndex]

  const handleOptionClick = (capital) => {
    if (selectedCapital !== null) return
    setSelectedCapital(capital)
    if (capital === currentQuestion.capital) {
      setShowMessage(1)
      setTimeout(() => {
        let newQuestionIndex = Math.floor(Math.random() * countriesData.length)
        setCurrentQuestionIndex(newQuestionIndex)
        setSelectedCapital(null)
        setShowMessage(0)
        setCapitals(generateCapitals(newQuestionIndex))
      }, 1000)
    } else {
      setShowMessage(2)
      setTimeout(() => {
        setCapitals(generateCapitals(currentQuestionIndex))
        setSelectedCapital(null)
        setShowMessage(0)
      }, 1000)
    }
  }

  return (
    <Layout>
      <h1>Guess the Capital</h1>
      <h2>{currentQuestion ? currentQuestion.name : "…"}</h2>
      <div className="clickable-options">
        {capitals.map((capital, index) => (
          <button key={index} onClick={() => handleOptionClick(capital)}>
            {capital}
          </button>
        ))}
      </div>
      <div className="message">
        {showMessage === 1 && (
          <p className="success">Congratulations! You guessed it right!</p>
        )}
        {showMessage === 2 && (
          <p className="failure">Oops! You guessed it wrong.</p>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Guess the Capital" />

export default GuessTheCapitalPage
