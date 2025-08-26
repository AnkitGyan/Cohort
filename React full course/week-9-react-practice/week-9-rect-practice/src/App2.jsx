import React, { useEffect, useState } from "react";

function App() {
  const [counterVisible, setCounterVisible] = useState(true);

  return (
    <div>
      <h1>Hi</h1>
      <button onClick={() => setCounterVisible(prev => !prev)}>
        Toggle Counter
      </button>

      {counterVisible && <Counter />}

      <p>hello</p>
    </div>
  );
}

// ✅ Mounting, Re-rendering, Unmounting Demo
function Counter() {
  const [count, setCount] = useState(0);

  // 🔁 Mount (once) + Cleanup (on unmount)
  useEffect(function () {
    console.log("🟢 on mount");

    let clock = setInterval(function () {
      console.log("⏱️ from inside setInterval");
      setCount(c => c + 1); // ✅ functional update
    }, 1000);

    return function () {
      console.log("🔴 on unmount");
      clearInterval(clock);
    };
  }, []); // Runs only once — like componentDidMount

  // 🔼 Manual increment button
  function increaseCount() {
    setCount(count + 1); // This is fine here because it's used onClick
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increaseCount}>Increase</button>
    </div>
  );
}

export default App2;
