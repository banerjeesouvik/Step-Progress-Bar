import React, {useEffect, useState, useRef} from 'react'
import { NODE_STATUS } from '../../constant-dictionary'
import PieSpinner from '../PieSpinner'

import tickIcon from '../../icons/tick.svg'
import errorIcon from '../../icons/error.svg'

import './style.css'

const getStatusIllustration = (status) => {
  switch(status) {
    case NODE_STATUS.RUNNING:
      return <PieSpinner />
    case NODE_STATUS.COMPLETE:
      return <img src={tickIcon} alt='✓' />
    case NODE_STATUS.ERROR:
      return <img src={errorIcon} alt='X' />
    default:
      return null
  }
}

const Node = ({status = NODE_STATUS.PENDING, name = '', togglePipelineRun, handleError}) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const [arg, setArg] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState()

  const inputRef = useRef(null)

  const handleChange = (e) => {
    setArg(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.which === 13) {
      setShowToolTip(false)
      if(arg.toLowerCase() === 'error') {
        setError(true)
        handleError(true)
      } else {
        setIsRunning(true)
        togglePipelineRun(true)
      }
    }
  }

  useEffect(() => {
    if (status === NODE_STATUS.ACTIVE) {
      setShowToolTip(true)
      togglePipelineRun(false)
    }
    if (status === NODE_STATUS.PENDING) {
      setShowToolTip(false)
      setError(false)
    }
    if (status === NODE_STATUS.COMPLETE) {
      setIsRunning(false)
    }
  }, [status, togglePipelineRun])
  
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [showToolTip])

  const nodeStatus = error ? NODE_STATUS.ERROR : (isRunning ? NODE_STATUS.RUNNING : status)

  return (
    <div className={`node ${nodeStatus}`}>
      <div className='circle'>
        {
          getStatusIllustration(nodeStatus)
        }
      </div>
      <div className='name'>{name}</div>
      {
        showToolTip &&
        <div className='tooltip'>
          <input type='text' value={arg} onChange={handleChange} onKeyDown={handleEnter} ref={inputRef} />
        </div>
      }
    </div>
  )
}

export default Node
