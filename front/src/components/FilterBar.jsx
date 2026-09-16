import './FilterBar.css'

// 인원/날짜/동반자유형/테마/자차유무 필터 항목을 입력받는 드롭다운 형태의 필터 패널
function FilterBar({
    headcount, setHeadcount,
    startDate, setStartDate,
    endDate, setEndDate,
    companionType, setCompanionType,
    theme, setTheme,
    hasCar, setHasCar,

    /* 지금수정 */
    onSave,

}) {
    return (
        <div className="filter-bar">
            {/* 인원수 선택 (1~10명) */}
            <select className="filter-item" value={headcount} onChange={(e) => setHeadcount(e.target.value)}>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
                <option value="9">9명</option>
                <option value="10">10명</option>
            </select>

            <span className="divider">|</span>

            {/* 여행 시작일~종료일 선택 (날짜 입력 2개를 하나로 묶어서 표시) */}
            <div className="date-range">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="date-tilde">~</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>


            <span className="divider">|</span>

            {/* 동반자유형 단일 선택 */}
            <select className="filter-item" value={companionType} onChange={(e) => setCompanionType(e.target.value)}>
                <option value="">동반</option>
                <option value="어린이">어린이</option>
                <option value="부모님">부모님</option>
                <option value="친구">친구</option>
                <option value="애인">애인</option>
            </select>

            <span className="divider">|</span>

            {/* 테마 단일 선택 (산/바다/도시/시골) */}
            <select className="filter-item" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">테마</option>
                <option value="산">산</option>
                <option value="바다">바다</option>
                <option value="도시">도시</option>
                <option value="시골">시골</option>
            </select>

            <span className="divider">|</span>

            {/* 자차 유무 체크박스 */}
            <label className="filter-item checkbox-item">
                <input type="checkbox" checked={hasCar} onChange={(e) => setHasCar(e.target.checked)} />
                자차
            </label>

            {/* 필터 저장 버튼 — 클릭 시 부모(HomePage)의 onSave 실행되어 요약 화면으로 전환 */}
            {/*  지금수정함  */}
            <button type="button" className="filter-save-btn" onClick={onSave}>
                필터 저장
            </button>
        </div>
    )
}

export default FilterBar
