import React from 'react'
import Radium from 'radium'

const defaultStyle = {
  base: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  },
}

const EmptyState = ({ text }) => (
  <div style={defaultStyle.base}>
    <h2 style={defaultStyle.text}>{text}</h2>
  </div>
)

export default Radium(EmptyState)
