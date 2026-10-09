import { CITY_COORDINATES } from '../src/data/cityList.js'

const SERVICE_KEY = process.env.TOUR_API_KEY
if (!SERVICE_KEY) {
    console.error('TOUR_API_KEY 환경변수를 설정하세요.')
    process.exit(1)
}

const THEMES = { 자연관광: 'NA', 역사관광: 'HS', 레저스포츠: 'LS', 체험관광: 'EX', 문화관광: 'VE' }

// 구가 있는 시 — 상위 "시" 통합코드엔 콘텐츠가 없어서, 콘텐츠 수가 가장 많은 구로 대체
const DISTRICT_OVERRIDE = {
    고양시: '281', 성남시: '135', 수원시: '115', 안산시: '273', 안양시: '173',
    용인시: '463', 부천시: '192', 청주시: '111', 천안시: '131', 전주시: '111',
    포항시: '113', 창원시: '125',
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function hasTheme(city, themeCode) {
    const signgu = DISTRICT_OVERRIDE[city.name] ?? city.lDongSignguCd
    const params = new URLSearchParams({
        serviceKey: SERVICE_KEY,
        lDongRegnCd: city.lDongRegnCd,
        lclsSystm1: themeCode,
        numOfRows: '1',
        MobileOS: 'ETC',
        MobileApp: 'GMG',
        _type: 'json',
    })
    if (signgu) params.append('lDongSignguCd', signgu)

    const res = await fetch(`https://apis.data.go.kr/B551011/KorService2/areaBasedList2?${params}`)
    const json = await res.json()
    return (json?.response?.body?.totalCount ?? 0) > 0
}

async function main() {
    const results = []
    for (const city of CITY_COORDINATES) {
        const themes = []
        for (const [themeName, themeCode] of Object.entries(THEMES)) {
            try {
                if (await hasTheme(city, themeCode)) themes.push(themeName)
            } catch (e) {
                console.error(`실패: ${city.name} / ${themeName}`, e.message)
            }
            await sleep(150)
        }
        console.log(`${city.name}: ${themes.join(', ')}`)
        results.push({ name: city.name, themes })
    }
    console.log('\n=== JSON ===')
    console.log(JSON.stringify(results, null, 2))
}

main()
