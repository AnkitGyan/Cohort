import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  
 // hooking into lifeCycle event of react
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          console.log('this is on mount');
          const updated = prev + 1;
          console.log("prev:", prev, "→ updated:", updated);
          return updated;
    });

    console.log("Stale count from closure:", count); // always 0
  }, 1000);

  return () => (
    clearInterval(interval));
}, []);


  return (
    <>
      <div>
        <button>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
