import { createContext, useState, useContext } from 'react';
import './App.css';

const BulbContext = createContext();

function App() {
  return (
    <>
      <LightBulb />
    </>
  );
}

function LightBulb() {
  const [bulbon, setBulbon] = useState(true);
  return (
    <>
      <BulbContext.Provider value={{ bulbon, setBulbon }}>
        <BulbState />
        <ToggleBulbState />
      </BulbContext.Provider>
    </>
  );
}

function BulbState() {
  const { bulbon } = useContext(BulbContext);
  return (
    <div>
      {
        bulbon 
          ? <img src="https://www.w3schools.com/js/pic_bulbon.gif" alt="Bulb On" />
          : <img src="https://www.w3schools.com/js/pic_bulboff.gif" alt="Bulb Off" />
      }
    </div>
  );
}

function ToggleBulbState() {
  const { setBulbon } = useContext(BulbContext);
  function toggle() {
    setBulbon(currentState => !currentState);
  }

  return (
    <div>
      <button onClick={toggle}>Toggle the Button</button>
    </div>
  );
}

export default App;
