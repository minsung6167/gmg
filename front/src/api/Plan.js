const BASE_URL = 'http://localhost:8080'

export async function fetchMyPlans() {
    const res = await fetch(`${BASE_URL}/api/plans`, {
        credentials: 'include',
    })
    if (!res.ok) {
        return null
    }
    return res.json()
}

export async function fetchPlan(planId) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}`, {
        credentials: 'include',
    })
    if (!res.ok) {
        return null
    }
    return res.json()
}

export async function createPlan(payload) {
    const res = await fetch(`${BASE_URL}/api/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    })
    if (!res.ok) {
        throw new Error('계획 저장에 실패했습니다.')
    }
    return res.json()
}

export async function makeAiPlan(planId) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/ai-plan`, {
        method: 'POST',
        credentials: 'include',
    })
    if (!res.ok) {
        throw new Error('AI 계획 만들기에 실패했습니다.')
    }
    return res.text()
}

export async function fetchPlanItems(planId) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/items`, {
        credentials: 'include',
    })
    if (!res.ok) {
        return []
    }
    return res.json()
}

export async function updateStay(planId, itemId, stayMinutes) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ stayMinutes }),
    })
    if (!res.ok) {
        return null
    }
    return res.json()
}

export async function updateDayStart(planId, dayNumber, startTime) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/days/${dayNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ startTime }),
    })
    if (!res.ok) {
        return null
    }
    return res.json()
}