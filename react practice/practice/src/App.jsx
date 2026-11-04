import { useState } from 'react'
import './App.css'

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div className='root'>
      
      {/* Snow particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <i key={i}></i>
      ))}

      <div className='animation'>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'Show'}
        </button>

        <h1 className={visible ? 'fadeIn' : 'fadeOut'}>
          This is conditional visibility
        </h1>
      </div>
    </div>
  )
}

export default App