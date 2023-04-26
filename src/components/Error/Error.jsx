import React from 'react'
import "./Error.scss";
export default function Error({message}) {
  return (
    <span className='error-form'>{message}</span>
  )
}
