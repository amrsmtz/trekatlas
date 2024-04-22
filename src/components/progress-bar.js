import React from "react"

const ProgressBar = ({ progress }) => {
  const progressBarStyles = {
    width: `${progress}%`,
    height: '5px',
    backgroundColor: 'var(--color-text)',
    transition: 'width 0.5s ease-in-out', // Optional: Add animation to the progress bar
  };

  return (
    <div className="progress-bar" style={{ border: '1px solid black', width: '100%' }}>
      <div style={progressBarStyles}></div>
    </div>
  )
}

export default ProgressBar