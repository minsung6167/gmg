import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import ResultPage from './pages/ResultPage'
import PlanBefore from './pages/PlanBefore'
import PlanAfter from './pages/PlanAfter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/plan-before" element={<PlanBefore />} />
      <Route path="/plan-after" element={<PlanAfter />} />
    </Routes>
  )
}

export default App
