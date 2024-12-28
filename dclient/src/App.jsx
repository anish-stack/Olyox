
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Register from './page/Register'
import Otp from './page/Otp'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/otp-verify' element={<Otp />} />


      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
