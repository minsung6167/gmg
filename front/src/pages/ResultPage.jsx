import './ResultPage.css'

// 화면 3-A: 확정된 지역 정보와 가볼만한곳 리스트, 하단 네비게이션을 보여주는 홈 화면
function ResultPage() {
    return (
        <div className="result-page">
            <div className="info-area">
                {/* 상단: 확정 지역명 + 대표사진 + 요약(인원수/날짜/공유) */}
                상단
            </div>

            <div className="list-area">
                {/* 중간: 가볼만한곳 리스트 (최대 20) */}
                리스트
            </div>

            <div className="nav-area">
                {/* 하단: 네비게이션 (홈/계획/도구) */}
                하단바
            </div>
        </div>
    )
}

export default ResultPage
