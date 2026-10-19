import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMe, logout } from '../api/Login'
import { fetchMyPlans } from '../api/Plan'
import { StartNotLogin } from '../data/StartNotLogin'
import { StartLogin } from '../data/StartLogin'
import FilterBar from '../components/FilterBar'
import './StartPage.css'

function StartPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [plan, setPlan] = useState(StartNotLogin)
    // HomePage와 동일한 필터 상태 모양
    const [filters, setFilters] = useState({
        headcount: 1,
        startDate: '',
        endDate: '',
        companionType: '',
        theme: '',
        hasCar: false,
    })

    useEffect(() => {
        fetchMe().then(async (me) => {
            setUser(me)
            if (!me) {
                setPlan(StartNotLogin)
                return
            }

            const plans = await fetchMyPlans()
            if (plans?.length) {
                const picked = plans[0]
                setPlan({
                    regionName: picked.regionName,
                    description: picked.startDate && picked.endDate
                        ? `${picked.startDate} ~ ${picked.endDate}`
                        : '내가 만든 여행 계획',
                    regionImage: picked.regionImage || StartLogin.regionImage,
                    isDummy: false,
                    id: picked.id,
                })
            } else {
                setPlan(StartLogin)
            }
        })
    }, [])

    const handleLogout = async () => {
        await logout()
        setUser(null)
        setPlan(StartNotLogin)
    }

    // HomePage와 동일한 onChange 패턴
    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="page">
            <div className="start-form">
                <div className="start-page">
                    <span className="brand-logo">GMG</span>

                    <div className="top-right">
                        {user ? (
                            <div className="user-info">
                                <span>{user.name}님</span>
                                <button onClick={handleLogout}>로그아웃</button>
                            </div>
                        ) : (
                            <button
                                className="login-button"
                                onClick={() => navigate('/login')}
                            >
                                로그인
                            </button>
                        )}
                    </div>

                    <div className="start-main">
                        <section
                            className="plan-card"
                            style={{ backgroundImage: `url(${plan.regionImage})` }}
                        >
                            <div className="plan-card-top">
                                <button
                                    type="button"
                                    className="plan-more"
                                    onClick={() => navigate(plan.morePath || '/plans')}
                                >
                                    {plan.moreLabel || '더보기'}
                                </button>
                            </div>
                            <div className="plan-card-bottom">
                                <strong>{plan.regionName}</strong>
                                <p>{plan.description}</p>
                            </div>
                        </section>

                        <h2 className="filter-title">어떤 여행을 떠날까요?</h2>

<div className="filter-box">
                        {/* 공유 FilterBar — filters / onChange만 전달 */}
                        <FilterBar filters={filters} onChange={handleChange} />
</div>
                        <div className="start-cta">
                            <button
                                className="pick-button"
                                onClick={() => navigate('/home', { state: filters })}
                            >
                                랜덤 여행지 뽑기
                            </button>
                            <p className="pick-hint">
                                조건에 맞는 국내 여행지를 무작위로 추천해드려요
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartPage
