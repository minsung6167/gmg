import './FilterBar.css'

const COMPANION_OPTIONS = ['어린이', '부모님', '친구', '애인']
const THEME_OPTIONS = ['자연관광', '역사관광', '레저스포츠', '체험관광', '문화관광']

// 인원/날짜/동반자유형/테마/이동수단 입력 필드만 그리는 순수 공유 컴포넌트.
// 버튼/저장/페이지이동은 이 컴포넌트가 모른다 — 쓰는 쪽(부모 페이지)이 각자 처리.
function FilterBar({ filters, onChange }) {
    return (
        <div className="filter-bar">
            {/* 1행: 가는날 → 오는날 */}
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

                <span className="filter-arrow">→</span>

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

            </div>

            {/* 2행: 인원수 + 동반자유형 */}
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
            </div>

            {/* 3행: 테마 + 이동수단(자차 토글) */}
            <div className="filter-row">
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

                <div className="filter-group">
                    <label className="filter-label">이동수단</label>
                    <label className="toggle-label">
                        🚗 자차
                        <input
                            type="checkbox"
                            className="filter-toggle"
                            checked={filters.hasCar}
                            onChange={(e) => onChange('hasCar', e.target.checked)}
                        />
                        <span className="toggle-switch" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
