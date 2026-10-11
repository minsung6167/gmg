import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FilterSummary from '../components/FilterSummary'
import { fetchPlan } from '../api/Plan'
import { fetchFavorites } from '../api/Favorite'

import './PlanBefore.css'

// 화면 3-B: AI 일정 생성 전, 즐겨찾기 리스트와 "AI 계획 짜기" 버튼을 보여주는 화면
function PlanBefore() {
    const { planId } = useParams()
    const navigate = useNavigate()
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlan(planId)
            .then(setPlan)
            .catch(() => setPlan(null))
            .finally(() => setLoading(false))
    }, [planId])

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavorites(planId).then(setFavorites)
    }, [planId])

    if (loading) {
        return <div className="page">계획을 불러오는 중이에요...</div>
    }
    if (plan === null) {
        return <div className="page">계획을 불러올 수 없어요. 로그인 상태를 확인해주세요.</div>
    }

    return (
        <div className="page">
            <div className="plan-before">
                <div className="header-area">
                    {/* 상단: 지역명 + 필터 요약 */}
                    <h1 className="plan-region-name">{plan.regionName}</h1>
                    <FilterSummary filters={plan} />
                </div>

                <div className="favorite-list-area">
                    {/* 중간: 즐겨찾기 리스트 */}
                    <h2 className="fav-title">즐겨찾기 ({favorites.length})</h2>
                    <ul className="fav-list">
                        {favorites.map((favorite) => (
                            <li key={favorite.id} className="fav-item">
                                <img className="fav-photo" src={favorite.placeImage} alt={favorite.placeName} />
                                <div className="fav-info">
                                    <h3 className="fav-name">{favorite.placeName}</h3>
                                    <p className="fav-rating">
                                        {favorite.rating !== null ? `★ ${favorite.rating}` : '평점 없음'}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {favorites.length === 0 && (
                        <p className="fav-empty">아직 즐겨찾기한 곳이 없어요. 홈 탭에서 ☆를 눌러 추가해보세요.</p>
                    )}
                </div>

                <div className="button-area">
                    {/* 하단: "AI 계획 짜기" 버튼 */}
                    <button
                        className="ai-plan-button"
                        disabled={favorites.length === 0}
                        onClick={() => navigate(`/plans/${planId}/plan-after`)}
                    >
                        AI 계획 짜기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlanBefore
