import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type === "info"){
    return (
      <div className="info">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification