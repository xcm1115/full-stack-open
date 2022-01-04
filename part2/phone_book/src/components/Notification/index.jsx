import React from 'react'
import './index.css'

const Notification = props => {
  const {message, type} = props;

  if(!message) {
    return null;
  } else {
    return <div className={`base ${type}`}>{message}</div>
  }
}

export default Notification;