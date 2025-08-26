import { useRef, useState } from 'react';

// A clock with start and stop button
function RefFun() {
  const [currentCount, setCurrentCount] = useState(1);
  const intervalRef = useRef(null); // To store interval ID

  function startCount() {
    if (intervalRef.current !== null) return; // Prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setCurrentCount((count) => count + 1);
    }, 1000);
  }

  function stopCount() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  return (
    <>
      <div><h2>{currentCount}</h2></div>
      <div>
        <button onClick={startCount}>Start</button>
        <button onClick={stopCount}>Stop</button>
      </div>
    </>
  );
}

export default RefFun;
