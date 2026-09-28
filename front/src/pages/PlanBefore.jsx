import './PlanBefore.css'

// 화면 3-B: AI 일정 생성 전, 즐겨찾기 리스트와 "AI 계획 짜기" 버튼을 보여주는 화면
function PlanBefore() {
    return (
        <div className="plan-before">
            <div className="header-area">
                {/* 상단: 지역명 + 필터 요약 */}
                상단(계획전)
            </div>

            <div className="favorite-list-area">
                {/* 중간: 즐겨찾기 리스트 */}
                중간(계획전)
            </div>

            <div className="button-area">
                {/* 하단: "AI 계획 짜기" 버튼 */}
                하단바(계획전)
            </div>
        </div>
    )
}

export default PlanBefore
