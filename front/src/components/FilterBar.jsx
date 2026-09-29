import './FilterBar.css'

// 인원/날짜/동반자유형/테마/자차유무 필터 항목을 입력받는 드롭다운 형태의 필터 패널
function FilterBar({
    headcount, setHeadcount,
    startDate, setStartDate,
    endDate, setEndDate,
    companionType, setCompanionType,
    theme, setTheme,
    hasCar, setHasCar,
    onSave,
}) {
    return (
        <div className="filter-bar">
            {/* 1행: 인원수 + 가는날/오는날 */}
            <div className="filter-row">
                <div className="filter-group">
                    <label className="filter-label">인원수</label>
                    <select className="filter-select" value={headcount} onChange={(e) => setHeadcount(e.target.value)}>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}명</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">가는날</label>
                    <input
                        className="filter-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">오는날</label>
                    <input
                        className="filter-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {/* 2행: 동반자유형 + 테마 + 자차 */}
            <div className="filter-row">
                <div className="filter-group">
                    <label className="filter-label">동반자유형</label>
                    <select className="filter-select" value={companionType} onChange={(e) => setCompanionType(e.target.value)}>
                        <option value="">선택 안함</option>
                        <option value="어린이">어린이</option>
                        <option value="부모님">부모님</option>
                        <option value="친구">친구</option>
                        <option value="애인">애인</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">테마</label>
                    <select className="filter-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="">선택 안함</option>
                        <option value="산">산</option>
                        <option value="바다">바다</option>
                        <option value="도시">도시</option>
                        <option value="시골">시골</option>
                    </select>
                </div>

                <div className="filter-group filter-group--checkbox">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={hasCar}
                            onChange={(e) => setHasCar(e.target.checked)}
                        />
                        자차
                    </label>
                </div>
            </div>

            {/* 3행: 저장 버튼 */}
            <div className="filter-row filter-row--save">
                <button type="button" className="filter-save-btn" onClick={onSave}>
                    필터 저장
                </button>
            </div>
        </div>
    )
}

export default FilterBar
