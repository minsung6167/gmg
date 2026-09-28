import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
// import RandomPage from './pages/RandomPage'
// import KoreaMap from './KoreaMap'
// import ResultPage from './pages/ResultPage'
// import PlanBefore from './pages/PlanBefore'
// import PlanAfter from './pages/PlanAfter'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/random" element={<RandomPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/plan-before" element={<PlanBefore />} />
      <Route path="/plan-after" element={<PlanAfter />} /> */}
    </Routes>
  )
}

export default App
