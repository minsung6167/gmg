// 저장된 필터 값을 한 줄로 요약해서 보여주고, 클릭하면 다시 FilterBar(입력 패널)로 돌아가게 하는 컴포넌트
function FilterSummary({ filters, onClick }) {
    return (
        <div className="filter-summary" onClick={onClick}>
            {filters.headcount}명 | {filters.startDate}~{filters.endDate} <br />
            {filters.companionType} | {filters.theme} | {filters.hasCar ? '자차 O' : '자차 X'}
        </div>
    )
}

export default FilterSummary