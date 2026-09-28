// 저장된 필터 값들을 한 줄로 요약해서 보여주고, 클릭 시 다시 필터 패널을 열게 하는 컴포넌트
function FilterSummary({ headcount, startDate, endDate, companionType, theme, hasCar, onClick }) {
    return (
        // 인원/날짜/동반자유형/테마/자차유무 값을 " | "로 구분해 한 줄로 표시, 클릭 시 onClick(필터 패널 재오픈) 실행
        <div className="filter-summary" onClick={onClick}>
            {headcount}명 | {startDate}~{endDate} <br /> {companionType} | {theme} | {hasCar ? '자차 O' : '자차 X'}
        </div>
    )
}

export default FilterSummary
