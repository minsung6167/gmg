import { useState } from 'react'
import FilterBar from '../components/FilterBar'
import './HomePage.css'
import FilterSummary from '../components/FilterSummary'  // 추가 필요


// 화면 2-A/2-B: 필터 선택(FilterBar)과 저장된 필터 요약(FilterSummary)을 토글하며 보여주는 첫 화면
function HomePage() {
    // 필터 입력값들 — 각 필터 항목을 개별 상태로 관리 (인원수/시작일/종료일/동반자유형/테마/자차유무)
    const [headcount, setHeadcount] = useState(1)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [companionType, setCompanionType] = useState('')
    const [theme, setTheme] = useState('')
    const [hasCar, setHasCar] = useState(false)

    // 필터 패널이 펼쳐져 있는지(true → FilterBar 표시) 접혀있는지(false → FilterSummary 표시) 여부
    const [isFilterOpen, setIsFilterOpen] = useState(true) // 처음엔 열린 상태로 시작

    return (
        <div className="home-page">
            <div className="filter-area">
                {/* isFilterOpen 값에 따라 필터 입력 패널 ↔ 저장된 필터 요약 바를 서로 바꿔 보여줌 */}
                {isFilterOpen ? (
                    <FilterBar
                        headcount={headcount} setHeadcount={setHeadcount}
                        startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate}
                        companionType={companionType} setCompanionType={setCompanionType}
                        theme={theme} setTheme={setTheme}
                        hasCar={hasCar} setHasCar={setHasCar}
                        onSave={() => setIsFilterOpen(false)} // "필터 저장" 클릭 시 패널을 닫고 요약 바로 전환
                    />
                ) : (
                    <FilterSummary
                        headcount={headcount}
                        startDate={startDate}
                        endDate={endDate}
                        companionType={companionType}
                        theme={theme}
                        hasCar={hasCar}
                        onClick={() => setIsFilterOpen(true)} // 요약 바 클릭 시 필터 패널을 다시 펼침
                    />
                )}
            </div>


            <div className="map-area">{/* 지도 */}</div>
            <div className="button-area">{/* 버튼 */}</div>
        </div>
    )
}

export default HomePage
