import React, { useState, useEffect, Fragment } from 'react'
import Node from '../Node'
import useInterval from '../UseInterval'

import { STEPS, NODE_STATUS } from '../../constant-dictionary'

import './style.css'

const ProgressBar = ({startIndex = 0, stepTime = 5000, startPipeline}) => {
  const [activeIndex, setActiveIndex] = useState()
  const [completedSteps, setCompletedSteps] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState()

  const status = startPipeline ? (activeIndex < STEPS.length ? 'on' : 'off') : 'off'
  const progressPercentage = Math.min(((completedSteps.length / (STEPS.length - 1)) * 100), 100)

  useInterval(() => {
    setActiveIndex(activeIndex + 1)
    setCompletedSteps([...completedSteps, activeIndex])
  }, isRunning ? stepTime : null, status)

  useEffect(() => {
    if (startPipeline) {
      setActiveIndex(startIndex)
    } else {
      setActiveIndex()
      setCompletedSteps([])
    }
  }, [startPipeline, startIndex])

  
  return (
    <Fragment>
      <div className='progress-bar'>
      <div className='progress-bar-container'>
        <div className='progress-bar-progress' style={{width: progressPercentage+'%'}} />
      </div>
      <div className='nodes-container'>
        {
          STEPS.map((step, i) =>
            <Node
              name={step}
              key={`step-${step}`}
              status={
                i === activeIndex ? NODE_STATUS.ACTIVE
                : completedSteps.includes(i) ? NODE_STATUS.COMPLETE : NODE_STATUS.PENDING
              }
              togglePipelineRun={setIsRunning}
              handleError={setError}
            />
          )
        }
      </div>
    </div>
    {
      error && <div className='error-msg'>Error in step: {STEPS[activeIndex]}</div>
    }
    </Fragment>
  )
}

export default ProgressBar
