import './PlanAfter.css'

// 화면 3-C: AI가 생성한 일정을 지도와 일차별 탭으로 보여주고 체류시간을 입력받는 화면
function PlanAfter() {
    return (
        <div className="plan-after">
            <div className="header-area">
                {/* 상단: 지역명 + 필터 요약 */}
                상단(계획 후)
            </div>

            <div className="map-area">
                {/* 지도 + 클러스터링 마커 */}
                지도(계획 후)
            </div>

            <div className="day-tabs-area">
                {/* 일수만큼 탭 (1일차/2일차...) */}
                탭(계획 후)
            </div>

            <div className="schedule-area">
                {/* 일정 항목별 체류시간 입력 */}
                체류시간(계획 후)
            </div>
        </div>
    )
}

export default PlanAfter
