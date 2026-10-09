const BASE_URL = 'http://localhost:8080'

export async function fetchTourSpots({ lDongRegnCd, lDongSignguCd }) {
    const params = new URLSearchParams({ lDongRegnCd })
    if (lDongSignguCd) params.append('lDongSignguCd', lDongSignguCd)

    const res = await fetch(`${BASE_URL}/api/tour-spots?${params}`, {
        credentials: 'include',
    })
    if (!res.ok) {
        throw new Error('관광지 정보를 불러오지 못했습니다.')
    }
    return res.json() // 백엔드에서 produces=JSON 설정해뒀으니 바로 json()
}
