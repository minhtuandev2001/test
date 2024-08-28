import React, { useState } from 'react'

export default function Ball({ ball, handleDeleteBall }) {
  const [chooseBall, setChooseBall] = useState(false);
  const handleDelayDeleteBall = () => {
    setChooseBall(true);
    setTimeout(() => {
      handleDeleteBall(ball.index);
    }, 3000);
  }
  return (
    <div className="ball1"
      onClick={handleDelayDeleteBall}
      style={{
        top: ball.top,
        left: ball.left,
        zIndex: ball.index,
        backgroundColor: chooseBall ? "red" : "white",
        transition: 'background-color 2s ease'
      }}>
      {ball.index + 1}
    </div>
  )
}
