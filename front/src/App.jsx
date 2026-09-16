import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import ResultPage from './pages/ResultPage'
import PlanBefore from './pages/PlanBefore'
import PlanAfter from './pages/PlanAfter'

// 각 경로(URL)에 화면 컴포넌트를 연결하는 최상위 라우팅 컴포넌트
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
