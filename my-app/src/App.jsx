import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './components/SignUp'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard />
      
   
    </>
  )
}

export default App
