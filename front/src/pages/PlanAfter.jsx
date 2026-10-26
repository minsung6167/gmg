import FilterSummary from '../components/FilterSummary'
import { useEffect } from 'react'
import './PlanAfter.css'

const day1Places = [
    { name: '경포해변', time: '10:00', stay: 90, travel: 12, lat: 37.8055, lng: 128.9083, reason: '오전에 한산하고 바다 산책하기 좋아요' },
    { name: '오죽헌', time: '11:42', stay: 60, travel: 15, lat: 37.7792, lng: 128.8786, reason: '경포에서 가깝고 실내외 관람이 고르게 있어요' },
    { name: '강릉중앙시장', time: '12:57', stay: 90, travel: 18, lat: 37.7545, lng: 128.8990, reason: '점심 시간대에 맞춰 시장 먹거리를 즐길 수 있어요' },
    { name: '안목해변 커피거리', time: '14:45', stay: 120, travel: null, lat: 37.7722, lng: 128.9473, reason: '오후 바다 전망 카페에서 쉬어가기 좋아요' },
]

// 화면 3-C: AI가 생성한 일정을 지도와 일차별 탭으로 보여주고 체류시간을 입력받는 화면
function PlanAfter() {
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return
        const container = document.getElementById('plan-map')
        const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(day1Places[0].lat, day1Places[0].lng),
            level: 6,
        })

        const bounds = new window.kakao.maps.LatLngBounds()
        day1Places.forEach((place) => {
            const position = new window.kakao.maps.LatLng(place.lat, place.lng)
            new window.kakao.maps.Marker({ map, position })
            bounds.extend(position)
        })
        map.setBounds(bounds)
    }, [])

    return (
        <div className="page">
            <div className="plan-after">
                <div className="header-area">
                    {/* 상단: 지역명 + 필터 요약 */}
                    <h1 className="plan-region-name">강릉시</h1>
                    <FilterSummary filters={{
                        headcount: 2,
                        startDate: '2026-10-17',
                        endDate: '2026-10-19',
                        companionType: '친구',
                        theme: '자연관광',
                        hasCar: true,
                    }} />

                </div>

                <div className="map-area">
                    {/* 지도 + 클러스터링 마커(일차별 탭에 해당하는 장소만, 1일차 탭일때는 1일차에 해당하는 장소만 마커) */}
                    <div id="plan-map" className="pa-map" />
                </div>
                <div className="day-tabs-area">
                    {/* 일수만큼 탭 (1일차/2일차/...n일차) */}
                    <div className="pa-tabs">
                        <button className="pa-tab">전체</button>
                        <button className="pa-tab active">1일차</button>
                        <button className="pa-tab">2일차</button>
                        <button className="pa-tab">3일차</button>
                    </div>
                </div>

                <div className="schedule-area">
                    {/* 해당 일차 일정표, 일정 항목별 체류시간 입력 */}
                    <ul className="pa-list">
                        {day1Places.map((place, index) => (
                            <li key={place.name} className="pa-item">
                                <div className="pa-row">
                                    <span className="pa-num">{index + 1}</span>
                                    <div className="pa-info">
                                        <p className="pa-time">{place.time}</p>
                                        <h3 className="pa-name">{place.name}</h3>
                                        <p className="pa-reason">{place.reason}</p>
                                    </div>
                                    <label className="pa-stay">
                                        체류 <input type="number" defaultValue={place.stay} /> 분
                                    </label>
                                </div>
                                {place.travel !== null && (
                                    <p className="pa-travel">🚗 다음 장소까지 {place.travel}분</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default PlanAfter
