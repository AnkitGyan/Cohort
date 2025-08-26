import { createContext, useContext, useState,memo } from 'react';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css';
import { counterAtom, EvenSelector } from './store/atoms/counter';

// const CountContext = createContext();

// function CountContextProvider({ children }) {
//   const [count, setCount] = useState(0);

//   return (
//     <CountContext.Provider value={{ count, setCount }}>
//       {children}
//     </CountContext.Provider>
//   );
// }

function App() {
  return (
   <RecoilRoot>
      <Counter />
      <IsEven/>
   </RecoilRoot>
  );
}

function Counter(){
  return (
    <>
      <CurrentCounter/>
      <Increase />
      <Decrease />
    </>
  );
}

function CurrentCounter() {
  const count = useRecoilValue(counterAtom);
  return (
    <>
      <h1>{count}</h1>
    </>
  );
}

const Increase = memo(() => {
  console.log("Increase rendered");
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount(prev => prev + 1)}>Increase</button>;
});

const Decrease = memo(() => {
  console.log("Decrease rendered");
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount(prev => prev - 1)}>Decrease</button>;
});


function IsEven(){
  const even = useRecoilValue(EvenSelector);

  return(<div>
    {even? <h3>even</h3> : <h3>odd</h3>}
  </div>)
}

export default App;