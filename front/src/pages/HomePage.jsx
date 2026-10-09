import { useNavigate } from 'react-router-dom'   // 추가
import { useEffect, useRef, useState } from 'react'
import FilterBar from '../components/FilterBar'
import FilterSummary from '../components/FilterSummary'
import { CITY_COORDINATES } from '../data/cityList'
import { fetchTourSpots } from '../api/TourSpot'
import './HomePage.css'

// 화면 2-A/2-B/2-C: 필터 입력(FilterBar) ↔ 필터 요약(FilterSummary)을 토글하고,
// 카카오맵 위에 "랜덤 돌리기" 결과(지역 마커 + TOP3 관광지 마커)를 보여주는 메인 화면
function HomePage() {
    // 필터 6개 값을 객체 하나로 관리 (FilterBar/FilterSummary에 filters로 그대로 전달)
    const [filters, setFilters] = useState({
        headcount: 1,
        startDate: '',
        endDate: '',
        companionType: '',
        theme: '',
        hasCar: false,
    })

    // 필터 항목 하나(key)의 값을 value로 변경 — FilterBar의 onChange로 전달됨
    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    // true: FilterBar(입력 패널) 표시, false: FilterSummary(요약 바) 표시
    const [isFilterOpen, setIsFilterOpen] = useState(true)

    // 랜덤으로 뽑힌 지역 정보 (cityList.js의 한 항목: name/x/y/lDongRegnCd/lDongSignguCd/themes 등)
    const [pickedCity, setPickedCity] = useState(null)
    // TourAPI에서 받아온 관광지 목록 (최대 20개)
    const [spots, setSpots] = useState([])

    // 카카오맵 인스턴스를 담아두는 ref — useEffect 안에서만 쓰면 handleRandomClick에서 재사용이 안 되기 때문에 ref로 보관
    const mapRef = useRef(null)
    // 지역 마커는 한 번에 하나만 존재해야 하므로 단일 값으로 보관 (재뽑기 시 이전 마커 제거용)
    const regionMarkerRef = useRef(null)
    // TOP3 관광지 마커는 3개가 동시에 존재하므로 배열로 보관 (재뽑기 시 전부 제거용)
    const spotMarkersRef = useRef([])
    // TOP3 마커에 연결된 정보창(InfoWindow)들 — 재뽑기 시 열려있는 걸 닫기 위해 보관
    const infoWindowsRef = useRef([])

    const navigate = useNavigate()   // 추가

    // 카카오맵 SDK가 로드된 뒤 #map 요소에 지도를 1회만 생성 (최초 렌더링 시 한 번)
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return
        const container = document.getElementById('map')
        if (!container) return
        mapRef.current = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(36.5, 127.9), // 대한민국 중앙 부근 기본 좌표
            level: 13, // 전국이 보이는 줌 레벨
        })
    }, [])

    // "랜덤 돌리기" 버튼 클릭 시 실행되는 전체 흐름
    // 1) 테마 필터로 85개 지역 중 후보를 좁혀서 랜덤 선택
    // 2) 지도를 그 지역으로 이동시키고 지역 마커 표시
    // 3) 백엔드(/api/tour-spots)를 통해 그 지역의 관광지 최대 20개 조회
    // 4) 응답 앞에서 3개를 TOP3로 간주해 마커 표시 (평점 로직 없음, 추후 고도화 예정)
    // 5) TOP3 마커 클릭 시 사진+이름+주소가 담긴 정보창 표시
    const handleRandomClick = async () => {
        // 1) 테마 필터링 + 랜덤 선택
        // filters.theme이 비어있으면(선택 안함) 85개 전체가 후보, 아니면 themes 배열에 그 테마가 포함된 도시만 후보
        const candidates = filters.theme
            ? CITY_COORDINATES.filter((city) => city.themes.includes(filters.theme))
            : CITY_COORDINATES
        const city = candidates[Math.floor(Math.random() * candidates.length)]
        setPickedCity(city)

        // 2) 지도 이동 + 지역 마커 표시
        const position = new window.kakao.maps.LatLng(city.y, city.x)
        mapRef.current.setCenter(position)

        if (regionMarkerRef.current) {
            regionMarkerRef.current.setMap(null) // 이전 지역 마커 제거 (재뽑기 시 중복 방지)
        }
        regionMarkerRef.current = new window.kakao.maps.Marker({
            map: mapRef.current,
            position,
        })

        // 3) TourAPI 조회 (백엔드가 서비스키를 붙여서 대신 호출해주는 프록시 API)
        try {
            const result = await fetchTourSpots({
                lDongRegnCd: city.lDongRegnCd,
                lDongSignguCd: city.lDongSignguCd,
            })
            const items = result?.response?.body?.items?.item ?? []
            setSpots(items)

            // 이전 TOP3 마커 + 정보창 전부 제거 (재뽑기 시 중복 방지)
            spotMarkersRef.current.forEach((marker) => marker.setMap(null))
            spotMarkersRef.current = []
            infoWindowsRef.current.forEach((infoWindow) => infoWindow.close())
            infoWindowsRef.current = []

            // 4) 응답 중 앞 3개를 TOP3로 사용해 마커 표시
            items.slice(0, 3).forEach((spot) => {
                const spotPosition = new window.kakao.maps.LatLng(spot.mapy, spot.mapx)
                const marker = new window.kakao.maps.Marker({
                    map: mapRef.current,
                    position: spotPosition,
                })
                spotMarkersRef.current.push(marker)

                // 5) 마커 클릭 시 띄울 정보창 (사진 + 이름 + 주소)
                const infoWindow = new window.kakao.maps.InfoWindow({
                    content: `
                        <div style="padding:8px; max-width:200px;">
                            ${spot.firstimage ? `<img src="${spot.firstimage}" style="width:100%; border-radius:4px;" />` : ''}
                            <p style="margin:6px 0 2px; font-weight:600;">${spot.title}</p>
                            <p style="margin:0; font-size:12px; color:#666;">${spot.addr1 ?? ''}</p>
                        </div>
                    `,
                })
                infoWindowsRef.current.push(infoWindow)

                window.kakao.maps.event.addListener(marker, 'click', () => {
                    infoWindow.open(mapRef.current, marker)
                })
            })
        } catch (error) {
            console.error(error)
            alert('관광지 정보를 불러오지 못했습니다.')
        }
    }

    // 추가: "이 지역으로 계획짜기" 클릭 시 ResultPage로 데이터 넘기기
    const handleGoToResult = () => {
        navigate('/result', {
            state: { filters, pickedCity, spots },
        })
    }

    return (
        <div className="page">
            <div className="home-page">
                <div className="filter-area">
                    {isFilterOpen ? (
                        <FilterBar
                            filters={filters}
                            onChange={handleChange}
                            onSave={() => setIsFilterOpen(false)} // "필터 저장" 클릭 시 요약 바로 전환
                        />
                    ) : (
                        <FilterSummary filters={filters} onClick={() => setIsFilterOpen(true)} /> // 요약 바 클릭 시 다시 필터 패널 펼침
                    )}
                </div>

                <div className="map-area">
                    <div id="map" className="map-box" />
                </div>

                <div className="button-area">
                    {pickedCity ? (
                        <>
                            <button onClick={handleRandomClick}>다시 돌리기</button>
                            <button onClick={handleGoToResult}>이 지역으로 계획짜기</button>
                        </>
                    ) : (
                        <button className="random-btn" onClick={handleRandomClick}>랜덤 돌리기</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage
