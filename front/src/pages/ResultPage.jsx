import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterSummary from '../components/FilterSummary'
import { fetchPlan } from '../api/Plan'
import { fetchFavorites, addFavorite, removeFavorite } from '../api/Favorite'
import { fetchTourSpots } from '../api/TourSpot'

import './ResultPage.css'

// 화면 3-A: 확정된 지역 정보와 가볼만한곳 리스트, 하단 네비게이션을 보여주는 홈 화면
function ResultPage() {
    const { planId } = useParams()
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlan(planId)
            .then(setPlan)
            .catch(() => setPlan(null))
            .finally(() => setLoading(false))
    }, [planId])

    const [places, setPlaces] = useState([])

    useEffect(() => {
        if (plan === null) return
        fetchTourSpots({ lDongRegnCd: plan.regionCode, lDongSignguCd: plan.sigunguCode })
            .then((result) => {
                const items = result?.response?.body?.items?.item ?? []
                setPlaces(items.map((spot) => ({
                    id: Number(spot.contentid),
                    name: spot.title,
                    image: spot.firstimage,
                    rating: null,
                })))
            })
    }, [plan])

    const [favoriteIds, setFavoriteIds] = useState([])
    useEffect(() => {
        fetchFavorites(planId).then((favorites) => {
            setFavoriteIds(favorites.map((favorite) => favorite.placeId))
        })
    }, [planId])

    const toggleFavorite = async (place) => {
        if (favoriteIds.includes(place.id)) {
            const ok = await removeFavorite(planId, place.id)
            if (ok) {
                setFavoriteIds(favoriteIds.filter((id) => id !== place.id))
            }
        } else {
            const ok = await addFavorite(planId, place)
            if (ok) {
                setFavoriteIds([...favoriteIds, place.id])
            }
        }
    }


    if (loading) {
        return <div className="page">계획을 불러오는 중이에요...</div>
    }
    if (plan === null) {
        return <div className="page">계획을 불러올 수 없어요. 로그인 상태를 확인해주세요.</div>
    }

    return (
        <div className="page">
            <div className="result-page">
                <div className="info-area">
                    {/* 상단: 확정 지역명 + 대표사진 + 요약(인원수/날짜/공유) */}
                    <div className="main-image">
                        <img className="region-photo"
                            src={plan.regionImage}
                            alt={plan.regionName} />
                        <h1 className="region-name">{plan.regionName}</h1>
                        <button className="share-button">공유</button>

                    </div>
                    <FilterSummary filters={plan} />

                </div>

                <div className="list-area">
                    {/* 중간: 가볼만한곳 리스트 (최대 20) */}
                    <h2 className="list-title">가볼만한 곳</h2>
                    <ul className="place-list">
                        {places.map((place) => (
                            <li key={place.id} className="place-item">
                                <img className="place-photo"
                                    src={place.image}
                                    alt={place.name} />
                                <div className="place-info">
                                    <h3 className="place-name">{place.name}</h3>
                                    <p className="place-rating">
                                        {place.rating !== null ? `★ ${place.rating}` : '평점 없음'}
                                    </p>
                                </div>
                                <button className="favorite-button" aria-label={`${place.name} 즐겨찾기`} onClick={() => toggleFavorite(place)}>
                                    {favoriteIds.includes(place.id) ? '★' : '☆'}
                                </button>

                            </li>
                        ))}

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default ResultPage
