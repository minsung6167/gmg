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

// 추가
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