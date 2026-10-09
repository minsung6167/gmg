const BASE_URL = 'http://localhost:8080'

export async function fetchFavorites(planId) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/favorites`, {
        credentials: 'include',
    })
    if (!res.ok) {
        return []
    }
    return res.json()
}

export async function addFavorite(planId, place) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            placeId: place.id,
            placeName: place.name,
            placeImage: place.image,
            rating: place.rating,
        }),
    })
    return res.ok
}

export async function removeFavorite(planId, placeId) {
    const res = await fetch(`${BASE_URL}/api/plans/${planId}/favorites/${placeId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    return res.ok
}
