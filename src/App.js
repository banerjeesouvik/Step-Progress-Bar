import React, {useState} from 'react';
import ProgressBar from './components/ProgressBar'

import './App.css'

function App() {
  const [pipelineStatus, setPipelineStatus] = useState('off')

  const togglePipeline = () => {
    const nextStatus = pipelineStatus === 'on' ? 'off' : 'on'
    setPipelineStatus(nextStatus)
  }

  const startPipeline = pipelineStatus === 'on'
  return (
    <div className="App">
      <header>
        <span>Logo</span>
        <span>Help</span>
      </header>
      <main>
        <div className='purpose'>Purpose</div>
        {
          !startPipeline ?
          <button className={'start-btn' + (startPipeline ? ' reset' : '')} onClick={togglePipeline}>
            {startPipeline ? 'Reset' : 'Start'}
          </button>
          :<ProgressBar startIndex={0} stepTime={5000} startPipeline={startPipeline} />
        }
      </main>
    </div>
  );
}

export default App;
