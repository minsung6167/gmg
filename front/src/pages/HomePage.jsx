import { useEffect, useState } from 'react'
import FilterBar from '../components/FilterBar'
import FilterSummary from '../components/FilterSummary'
import './HomePage.css'

// 화면 2-A/2-B: 필터 입력(FilterBar) ↔ 필터 요약(FilterSummary)을 토글하고, 카카오맵과 랜덤 버튼을 보여주는 메인 화면
function HomePage() {
    // 필터 6개 값을 객체 하나로 관리 (FilterBar/FilterSummary에 filters로 그대로 전달)
    const [filters, setFilters] = useState({
        headcount: 1,
        startDate: '',
        endDate: '',
        companionType: '',
        theme: '',
        hasCar: false,
    })
    // 필터 항목 하나(key)의 값을 value로 변경 — FilterBar의 onChange로 전달됨
    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    // true: FilterBar(입력 패널) 표시, false: FilterSummary(요약 바) 표시
    const [isFilterOpen, setIsFilterOpen] = useState(true)

    // 카카오맵 SDK 로드 후 #map 요소에 지도 1회 생성
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return
        const container = document.getElementById('map')
        if (!container) return
        new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(36.5, 127.9),
            level: 13,
        })
    }, [])

    return (
        <div className="page">
            <div className="home-page">
                <div className="filter-area">
                    {isFilterOpen ? (
                        <FilterBar
                            filters={filters}
                            onChange={handleChange}
                            onSave={() => setIsFilterOpen(false)} // "필터 저장" 클릭 시 요약 바로 전환
                        />
                    ) : (
                        <FilterSummary filters={filters} onClick={() => setIsFilterOpen(true)} /> // 요약 바 클릭 시 다시 필터 패널 펼침
                    )}
                </div>

                <div className="map-area">
                    <div id="map" className="map-box" />
                </div>

                <div className="button-area">
                    {/* TODO: 랜덤 지역 뽑기 로직 연결 예정 (별도 브랜치) */}
                    <button className="random-btn">랜덤 돌리기</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage