import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FilterSummary from '../components/FilterSummary'
import './PlanAfter.css'
import { fetchPlan, fetchPlanItems, updateStay, updateDayStart } from '../api/Plan'

function itemName(item) {
    if (item.itemType === 'LUNCH') {
        return '점심식사'
    }
    if (item.itemType === 'DINNER') {
        return '저녁식사'
    }
    if (item.itemType === 'FREE') {
        return '자유시간'
    }
    return item.placeName
}

function PlanAfter() {
    const { planId } = useParams()
    const navigate = useNavigate()
    const [plan, setPlan] = useState(null)
    const [items, setItems] = useState([])
    const [selectedDay, setSelectedDay] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlan(planId).then(setPlan)
        fetchPlanItems(planId)
            .then(setItems)
            .finally(() => setLoading(false))
    }, [planId])

    let maxDay = 0
    for (let i = 0; i < items.length; i++) {
        if (items[i].dayNumber > maxDay) {
            maxDay = items[i].dayNumber
        }
    }

    const shownItems = selectedDay === 0
        ? items
        : items.filter((item) => item.dayNumber === selectedDay)

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            return
        }
        const mapItems = shownItems.filter((item) => item.mapy != null && item.mapx != null)
        if (mapItems.length === 0) {
            return
        }
        const container = document.getElementById('plan-map')
        const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(mapItems[0].mapy, mapItems[0].mapx),
            level: 6,
        })
        const bounds = new window.kakao.maps.LatLngBounds()
        for (let i = 0; i < mapItems.length; i++) {
            const position = new window.kakao.maps.LatLng(mapItems[i].mapy, mapItems[i].mapx)
            new window.kakao.maps.Marker({ map, position })
            bounds.extend(position)
        }
        map.setBounds(bounds)
    }, [shownItems])

    if (loading) {
        return <div className="page">일정을 불러오는 중이에요...</div>
    }
    if (plan === null) {
        return <div className="page">계획을 불러올 수 없어요. 로그인 상태를 확인해주세요.</div>
    }

    return (
        <div className="page">
            <div className="plan-after">
                <div className="header-area">
                    <h1 className="plan-region-name">{plan.regionName}</h1>
                    <FilterSummary filters={plan} />
                </div>

                <div className="map-area">
                    <div id="plan-map" className="pa-map" />
                </div>

                <div className="day-tabs-area">
                    <div className="pa-tabs">
                        <button
                            className={selectedDay === 0 ? 'pa-tab active' : 'pa-tab'}
                            onClick={() => setSelectedDay(0)}
                        >
                            전체
                        </button>
                        {Array.from({ length: maxDay }, (_, i) => i + 1).map((day) => (
                            <button
                                key={day}
                                className={selectedDay === day ? 'pa-tab active' : 'pa-tab'}
                                onClick={() => setSelectedDay(day)}
                            >
                                {day}일차
                            </button>
                        ))}
                    </div>
                </div>

                <div className="schedule-area">
                    <div className="pa-toolbar">
                        {selectedDay !== 0 && shownItems.length > 0 && (
                            <label className="pa-stay pa-day-start">
                                시작 시각{' '}
                                <input
                                    type="time"
                                    defaultValue={shownItems[0].startTime}
                                    key={selectedDay + '-' + shownItems[0].startTime}
                                    onBlur={(e) => {
                                        updateDayStart(planId, selectedDay, e.target.value)
                                            .then((nextItems) => {
                                                if (nextItems !== null) {
                                                    setItems(nextItems)
                                                }
                                            })
                                    }}
                                />
                            </label>
                        )}
                        <button
                            className="pa-tab pa-retry"
                            onClick={() => navigate(`/plans/${planId}/plan-before`)}
                        >
                            다시 짜기
                        </button>
                    </div>
                    <ul className="pa-list">
                        {shownItems.map((item, index) => (
                            <li key={item.id} className="pa-item">
                                <div className="pa-row">
                                    <span className="pa-num">{index + 1}</span>
                                    <div className="pa-info">
                                        <p className="pa-time">{item.startTime}</p>
                                        <h3 className="pa-name">{itemName(item)}</h3>
                                        <p className="pa-reason">{item.reason}</p>
                                        {item.warning != null && item.warning !== '' && (
                                            <p className="pa-reason pa-warning">{item.warning}</p>
                                        )}
                                    </div>
                                    <label className="pa-stay">
                                        체류{' '}
                                        <input
                                            type="number"
                                            defaultValue={item.stayMinutes}
                                            onBlur={(e) => {
                                                updateStay(planId, item.id, Number(e.target.value))
                                                    .then((nextItems) => {
                                                        if (nextItems !== null) {
                                                            setItems(nextItems)
                                                        }
                                                    })
                                            }}
                                        />{' '}
                                        분
                                    </label>
                                </div>
                                {item.travelMinutes != null && (
                                    <p className="pa-travel">다음 장소까지 {item.travelMinutes}분</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlanAfter