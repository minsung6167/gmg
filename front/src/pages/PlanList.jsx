import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMyPlans } from '../api/Plan'

// 화면 1-1: 로그인한 유저의 진행 중인 계획 목록을 보여주고, 선택하면 해당 계획의 결과 화면으로 이동
function PlanList() {
    const navigate = useNavigate()
    const [plans, setPlans] = useState([])

    useEffect(() => {
        fetchMyPlans().then(setPlans)
    }, [])

    if (plans === null) {
        return (
            <div className="page">
                <p>로그인이 필요해요.</p>
                <button onClick={() => navigate('/login')}>로그인하러 가기</button>
            </div>
        )
    }
    return (
        <div className="page">
            <button className="back-button" onClick={() => navigate('/')}>
                ← 뒤로
            </button>
            <h1 className="plan-list-title">내 계획</h1>
            <ul className="plan-list">
                {plans.map((plan) => (
                    <li key={plan.id} className="plan-item">
                        <button className="plan-card" onClick={() => navigate(`/plans/${plan.id}/result`)}>
                            <span className="plan-region">{plan.regionName}</span>
                            <span className="plan-date">{plan.startDate} ~ {plan.endDate}</span>
                        </button>
                    </li>
                ))}
            </ul>
            {plans.length === 0 && <p className="plan-empty">아직 만든 계획이 없어요.</p>}

        </div>
    )

}

export default PlanList
