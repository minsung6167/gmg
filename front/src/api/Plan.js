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

