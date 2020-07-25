import React from 'react'

import './style.css'

const PieSpinner = () => (
  <div className="wrapper">
    <div className="pie spinner" />
    <div className="pie filler" />
    <div className="mask" />
  </div>
)

export default PieSpinner