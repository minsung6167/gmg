import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { fetchMyPlans } from '../api/Plan'
import './PlanList.css'

const DAY = 86400000
const toDate = (s) => new Date(`${s}T00:00:00`)

const today = () => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

function getStatus(start, end) {
    const now = today()
    const diff = Math.round((toDate(start) - now) / DAY)

    if (diff > 0) return { label: `D-${diff}`, type: 'upcoming' }
    if (toDate(end) >= now) return { label: '여행 중', type: 'ongoing' }

    return { label: '여행완료', type: 'done' }
}

function formatDate(date) {
    const d = toDate(date)
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

function formatRange(start, end) {
    return `${formatDate(start)} – ${formatDate(end)}`
}

function getFilterChips(plan) {
    return [
        `${plan.headcount}명`,
        plan.companionType,
        plan.theme,
        plan.hasCar ? '자차' : '대중교통',
    ].filter(Boolean)
}

function PlanList() {
    const navigate = useNavigate()
    const [plans, setPlans] = useState([])
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        fetchMyPlans().then(setPlans)
    }, [])

    const filteredPlans = (plans ?? []).filter((plan) => {
        if (activeTab === 'upcoming') return toDate(plan.startDate) >= today()
        if (activeTab === 'past') return toDate(plan.endDate) < today()
        return true
    })

    const tabs = [
        { id: 'all', label: '전체' },
        { id: 'upcoming', label: '다가오는 여행' },
        { id: 'past', label: '지난 여행' },
    ]

    return (
        <div className="page plan-list-page">
            <header className="journey-header">
                <div className="journey-top">
                    <button
                        className="journey-back"
                        onClick={() => navigate('/')}
                        aria-label="뒤로가기"
                    >
                        ‹
                    </button>

                    <span className="journey-brand">GMG</span>
                </div>

                <div className="journey-heading">
                    <span>MY JOURNEY</span>
                    <h1>여행 계획</h1>
                    <p>설레는 여행을 한곳에서 관리해보세요.</p>
                </div>
            </header>

            <main className="journey-content">
                {plans === null ? (
                    <div className="plan-empty">
                        <p>로그인이 필요해요.</p>
                        <button
                            className="plan-login-btn"
                            onClick={() => navigate('/login')}
                        >
                            로그인하러 가기
                        </button>
                    </div>
                ) : (
                    <>
                        <section className="journey-summary">
                            <div>
                                <span className="summary-label">나의 여행</span>
                                <h2>
                                    총 <strong>{plans.length}</strong>개의 계획
                                </h2>
                            </div>

                            <button
                                className="add-plan-btn"
                                onClick={() => navigate('/home')}
                                aria-label="여행 추가"
                            >
                                +
                            </button>
                        </section>

                        <nav className="journey-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        {filteredPlans.length === 0 ? (
                            <div className="plan-empty">
                                <p>아직 만든 계획이 없어요.</p>
                            </div>
                        ) : (
                            <ul className="plan-list">
                                {filteredPlans.map((plan) => {
                                    const status = getStatus(
                                        plan.startDate,
                                        plan.endDate
                                    )

                                    const nights = Math.round(
                                        (toDate(plan.endDate) - toDate(plan.startDate)) / DAY
                                    )

                                    return (
                                        <li key={plan.id}>
                                            <button
                                                className="plan-item-btn"
                                                onClick={() =>
                                                    navigate(`/plans/${plan.id}/result`)
                                                }
                                            >
                                                <div className="plan-image">
                                                    <img
                                                        src={plan.regionImage}
                                                        alt={plan.regionName}
                                                    />

                                                    <span
                                                        className={`plan-badge plan-badge--${status.type}`}
                                                    >
                                                        {status.label}
                                                    </span>
                                                </div>

                                                <div className="plan-card-info">
                                                    <span className="plan-year">
                                                        {toDate(plan.startDate).getFullYear()}
                                                    </span>

                                                    <strong className="plan-region">
                                                        {plan.regionName}
                                                    </strong>

                                                    <span className="plan-date">
                                                        <Calendar
                                                            className="calendar-icon"
                                                            size={12}
                                                            strokeWidth={2}
                                                        />
                                                        {formatRange(
                                                            plan.startDate,
                                                            plan.endDate
                                                        )}
                                                    </span>

                                                    <span className="plan-duration">
                                                        {nights}박 {nights + 1}일
                                                    </span>

                                                    <div className="plan-filter-chips">
                                                        {getFilterChips(plan).map((chip) => (
                                                            <span
                                                                key={chip}
                                                                className="plan-filter-chip"
                                                            >
                                                                {chip}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <span className="plan-arrow">›</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}

export default PlanList