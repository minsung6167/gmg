import './FilterBar.css'

const COMPANION_OPTIONS = ['어린이', '부모님', '친구', '애인']
const THEME_OPTIONS = ['자연관광', '역사관광', '레저스포츠', '체험관광', '문화관광']


// 인원/날짜/동반자유형/테마/자차유무 필터 항목을 입력받는 드롭다운 형태의 필터 패널
function FilterBar({ filters, onChange, onSave }) {
    return (
        <div className="filter-bar">
            {/* 1행: 인원수 + 가는날/오는날 */}
            <div className="filter-row">

                <div className="filter-group">
                    <label className="filter-label" htmlFor="startDate">가는날</label>
                    <input
                        id="startDate"
                        className="filter-date"
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => onChange('startDate', e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="endDate">오는날</label>
                    <input
                        id="endDate"
                        className="filter-date"
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => onChange('endDate', e.target.value)}
                    />
                </div>

                <div className="filter-group filter-group--checkbox">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            checked={filters.hasCar}
                            onChange={(e) => onChange('hasCar', e.target.checked)}
                        />
                        자차
                    </label>
                </div>
            </div>

            {/* 2행: 동반자유형 + 테마 + 자차 */}
            <div className="filter-row">
                <div className="filter-group">
                    <label className="filter-label" htmlFor="headcount">인원수</label>
                    <select
                        id="headcount"
                        className="filter-select"
                        value={filters.headcount}
                        onChange={(e) => onChange('headcount', e.target.value)}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}명</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="companionType">동반자유형</label>
                    <select
                        id="companionType"
                        className="filter-select"
                        value={filters.companionType}
                        onChange={(e) => onChange('companionType', e.target.value)}
                    >
                        <option value="">선택 안함</option>
                        {COMPANION_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label" htmlFor="theme">테마</label>
                    <select
                        id="theme"
                        className="filter-select"
                        value={filters.theme}
                        onChange={(e) => onChange('theme', e.target.value)}
                    >
                        <option value="">선택 안함</option>
                        {THEME_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
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