import React from "react";

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload(); // This line reloads the page
  };

  return (
    <button onClick={handleRefresh}>
      Play again!
    </button>
  )
}

export default RefreshButton;
