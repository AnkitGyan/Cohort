import { useState } from 'react'
import './App.css'
import Button from './compnents/Button'
import Input from './compnents/Input'
import Otp from './compnents/Otp';

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div className='h-screen bg-blue-700 flex flex-col gap-4 items-center justify-center'>
      <Input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button disabled={false}>Signup</Button>
      <Otp/>
    </div>
  );
}

export default App;
