import { useState } from 'react';
import './App.css';
import { useFetchPost } from "./hooks/useFatch";
import { usePrev } from './hooks/usePrev';
import { useDebounce } from './hooks/useDebounce';
function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(pre => pre + 1);
  }

  function decreaseCount() {
    setCount(pre => pre - 1);
  }

  return {
    count,
    increaseCount,
    decreaseCount,
  }
}

function App() {
  const { count, increaseCount, decreaseCount } = useCounter();
  const preCount = usePrev(count);
  const [ postId, setPostId ] = useState(1); 
  const postTitle = useFetchPost("http://jsonplaceholder.typicode.com/posts/" + postId);
  const debounce = useDebounce(postTitle);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase {count}</button>
      <button onClick={decreaseCount}>Decrease {count}</button>
      <h2>{postTitle}</h2>
     <button onClick={() => setPostId(1)}>Post id : 1</button>
     <button onClick={() => setPostId(2)}>Post id : 2</button>
     <button onClick={() => setPostId(3)}>Post id : 3</button>
     <p>previous count : {preCount}</p>
    </>
  )
}

export default App;
