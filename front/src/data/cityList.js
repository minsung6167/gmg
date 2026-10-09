export const CITY_COORDINATES = [
    // 광역시 및 특별자치시 (8개, lDongSignguCd 없음)
    { name: "서울특별시", x: 126.977969, y: 37.566535, lDongRegnCd: "11", lDongSignguCd: null, description: "궁궐·한강·홍대·성수 등 고궁부터 트렌디한 핫플까지 다 있는 수도", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "전남 광주", x: 126.852601, y: 35.159545, lDongRegnCd: "12", lDongSignguCd: null, description: "무등산, 아시아문화전당, 양림동 등 예술과 남도 음식이 어우러진 문화도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "부산광역시", x: 129.075641, y: 35.179554, lDongRegnCd: "26", lDongSignguCd: null, description: "해운대·광안리 바다에 감천문화마을, 돼지국밥·씨앗호떡 등 먹거리까지 갖춘 해양도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "대구광역시", x: 128.601445, y: 35.871435, lDongRegnCd: "27", lDongSignguCd: null, description: "근대골목, 서문시장, 막창·납작만두로 유명한 분지 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "인천광역시", x: 126.705206, y: 37.456255, lDongRegnCd: "28", lDongSignguCd: null, description: "차이나타운, 월미도, 송도, 강화·옹진 섬 여행의 관문", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "대전광역시", x: 127.384548, y: 36.350411, lDongRegnCd: "30", lDongSignguCd: null, description: "성심당 빵과 대덕연구단지 과학관, 장태산 숲이 있는 과학·휴식 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "울산광역시", x: 129.311360, y: 35.538377, lDongRegnCd: "31", lDongSignguCd: null, description: "대왕암공원, 간절곶 일출, 태화강 국가정원이 있는 산업·자연 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "세종특별자치시", x: 127.289021, y: 36.480012, lDongRegnCd: "36110", lDongSignguCd: null, description: "호수공원과 정부청사, 국립박물관단지가 있는 계획 행정도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 경기도 (lDongRegnCd: 41, 28개 시)
    { name: "고양시", x: 126.832000, y: 37.658359, lDongRegnCd: "41", lDongSignguCd: "281", description: "일산호수공원, 킨텍스, 꽃 박람회로 유명한 신도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "과천시", x: 126.987697, y: 37.429212, lDongRegnCd: "41", lDongSignguCd: "290", description: "서울대공원·국립현대미술관·경마공원이 모인 가족 나들이 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "광명시", x: 126.864687, y: 37.478611, lDongRegnCd: "41", lDongSignguCd: "210", description: "광명동굴과 KTX 광명역, 대형 쇼핑몰이 있는 도시", themes: ["자연관광", "역사관광", "레저스포츠", "문화관광"] },
    { name: "경기 광주시", x: 127.252528, y: 37.429311, lDongRegnCd: "41", lDongSignguCd: "610", description: "남한산성과 팔당호 주변 카페거리, 도자기 공방이 있는 곳", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "구리시", x: 127.129527, y: 37.594308, lDongRegnCd: "41", lDongSignguCd: "310", description: "한강변 유채꽃·코스모스 정원과 고구려 유적이 있는 소도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "군포시", x: 126.935178, y: 37.361448, lDongRegnCd: "41", lDongSignguCd: "410", description: "수리산 자락의 산책로와 철쭉동산이 유명한 베드타운", themes: ["자연관광", "역사관광", "레저스포츠", "문화관광"] },
    { name: "김포시", x: 126.715717, y: 37.615286, lDongRegnCd: "41", lDongSignguCd: "570", description: "한강 하구 조강·애기봉과 라베니체 수변상가가 있는 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "남양주시", x: 127.216539, y: 37.636029, lDongRegnCd: "41", lDongSignguCd: "360", description: "다산 정약용 유적지, 두물머리, 수종사 등 한강·북한강 풍경이 좋은 곳", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "동두천시", x: 127.060699, y: 37.903650, lDongRegnCd: "41", lDongSignguCd: "250", description: "소요산 단풍과 계곡 물놀이로 알려진 경기 북부 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "부천시", x: 126.766001, y: 37.503592, lDongRegnCd: "41", lDongSignguCd: "192", description: "만화박물관·아인스월드 등 만화·영화 콘텐츠 도시", themes: ["자연관광", "역사관광", "레저스포츠", "문화관광"] },
    { name: "성남시", x: 127.126786, y: 37.420027, lDongRegnCd: "41", lDongSignguCd: "135", description: "판교 IT밸리와 남한산성, 모란시장이 있는 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "수원시", x: 127.028601, y: 37.263573, lDongRegnCd: "41", lDongSignguCd: "115", description: "유네스코 세계유산 수원화성과 행궁동, 수원 왕갈비가 대표", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "시흥시", x: 126.802877, y: 37.380203, lDongRegnCd: "41", lDongSignguCd: "390", description: "갯골생태공원·소래습지 등 갯벌 생태 체험 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "안산시", x: 126.830885, y: 37.321878, lDongRegnCd: "41", lDongSignguCd: "273", description: "대부도 바다와 서해안 드라이브 코스, 칼국수·조개구이", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "안성시", x: 127.279774, y: 37.008013, lDongRegnCd: "41", lDongSignguCd: "550", description: "안성팜랜드 목장 체험과 전통 장터, 바우덕이 풍물축제", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "안양시", x: 126.956860, y: 37.394253, lDongRegnCd: "41", lDongSignguCd: "173", description: "안양예술공원과 삼성산 계곡이 있는 도시 속 힐링 스팟", themes: ["레저스포츠", "문화관광"] },
    { name: "양주시", x: 127.045799, y: 37.785317, lDongRegnCd: "41", lDongSignguCd: "630", description: "나리공원 꽃밭과 회암사지, 장흥 예술 마을", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "여주시", x: 127.637012, y: 37.298284, lDongRegnCd: "41", lDongSignguCd: "670", description: "신륵사·세종대왕릉 등 역사 유적과 도자기, 여주 프리미엄 아울렛", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "오산시", x: 127.077227, y: 37.149887, lDongRegnCd: "41", lDongSignguCd: "370", description: "물향기수목원과 독산성이 있는 작은 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "용인시", x: 127.177554, y: 37.241086, lDongRegnCd: "41", lDongSignguCd: "463", description: "에버랜드·한국민속촌 등 대형 테마파크가 몰린 놀이 천국", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "의왕시", x: 126.968222, y: 37.344793, lDongRegnCd: "41", lDongSignguCd: "430", description: "왕송호수 레일바이크와 철도박물관이 있는 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "의정부시", x: 127.033735, y: 37.738096, lDongRegnCd: "41", lDongSignguCd: "150", description: "부대찌개거리 원조 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "이천시", x: 127.435012, y: 37.272275, lDongRegnCd: "41", lDongSignguCd: "500", description: "쌀밥·도자기, 온천 테마파크, 설봉공원", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "파주시", x: 126.779860, y: 37.760058, lDongRegnCd: "41", lDongSignguCd: "480", description: "임진각·DMZ 안보 관광과 헤이리, 출판도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "평택시", x: 127.102488, y: 36.992224, lDongRegnCd: "41", lDongSignguCd: "220", description: "서해안 평택호관광지와 미군기지 앞 이국적 거리", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "포천시", x: 127.201198, y: 37.894843, lDongRegnCd: "41", lDongSignguCd: "650", description: "산정호수, 아트밸리, 한탄강 지질공원 등 자연 명소가 풍부한 곳", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "하남시", x: 127.214878, y: 37.539223, lDongRegnCd: "41", lDongSignguCd: "450", description: "스타필드 하남과 미사 경정공원, 한강 조정경기장", themes: ["자연관광", "역사관광", "레저스포츠", "문화관광"] },
    { name: "화성시", x: 126.831268, y: 37.199484, lDongRegnCd: "41", lDongSignguCd: "590", description: "제부도 바다 갈라짐, 융건릉, 우음도 갈대밭", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 강원특별자치도 (lDongRegnCd: 51, 7개 시)
    { name: "강릉시", x: 128.876057, y: 37.751853, lDongRegnCd: "51", lDongSignguCd: "150", description: "경포대·안목 커피거리·초당순두부로 유명한 동해안 대표 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "동해시", x: 129.114312, y: 37.524740, lDongRegnCd: "51", lDongSignguCd: "170", description: "무릉계곡과 추암 촛대바위 일출 명소", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "삼척시", x: 129.165297, y: 37.449874, lDongRegnCd: "51", lDongSignguCd: "230", description: "환선굴·대금굴 동굴, 장호항 에메랄드빛 바다", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "속초시", x: 128.591804, y: 38.207011, lDongRegnCd: "51", lDongSignguCd: "210", description: "설악산, 속초해수욕장, 중앙시장 닭강정과 아바이마을", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "원주시", x: 127.920162, y: 37.342220, lDongRegnCd: "51", lDongSignguCd: "130", description: "소금산 출렁다리와 뮤지엄산, 치악산", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "춘천시", x: 127.729813, y: 37.885348, lDongRegnCd: "51", lDongSignguCd: "110", description: "닭갈비·막국수와 의암호·소양강 스카이워크, 레고랜드", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "태백시", x: 128.985688, y: 37.165215, lDongRegnCd: "51", lDongSignguCd: "190", description: "태백산 눈꽃 축제와 고원 지대의 시원한 여름", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 충청북도 (lDongRegnCd: 43, 3개 시)
    { name: "제천시", x: 128.212581, y: 37.132599, lDongRegnCd: "43", lDongSignguCd: "150", description: "의림지와 청풍호반 케이블카, 박달재", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "청주시", x: 127.489032, y: 36.642434, lDongRegnCd: "43", lDongSignguCd: "111", description: "직지 고인쇄 문화와 수암골 벽화마을, 상당산성", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "충주시", x: 127.925949, y: 36.991008, lDongRegnCd: "43", lDongSignguCd: "130", description: "충주호 유람선과 탄금대, 수안보 온천", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 충청남도 (lDongRegnCd: 44, 8개 시)
    { name: "계룡시", x: 127.248740, y: 36.274850, lDongRegnCd: "44", lDongSignguCd: "250", description: "계룡산 자락과 군 도시 특유의 한적함", themes: ["자연관광", "역사관광", "문화관광"] },
    { name: "공주시", x: 127.119001, y: 36.446473, lDongRegnCd: "44", lDongSignguCd: "150", description: "공산성·무령왕릉 등 백제 역사 유적이 가득한 곳", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "논산시", x: 127.098679, y: 36.187175, lDongRegnCd: "44", lDongSignguCd: "230", description: "탑정호 출렁다리, 딸기 특산지, 논산훈련소", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "당진시", x: 126.645938, y: 36.889814, lDongRegnCd: "44", lDongSignguCd: "270", description: "왜목마을 일출·일몰과 삽교호 함상공원", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "보령시", x: 126.589679, y: 36.353344, lDongRegnCd: "44", lDongSignguCd: "180", description: "대천해수욕장과 머드축제, 석탄박물관", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "서산시", x: 126.450317, y: 36.784499, lDongRegnCd: "44", lDongSignguCd: "210", description: "해미읍성과 마애삼존불, 간월암, 어리굴젓", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "아산시", x: 127.001850, y: 36.789853, lDongRegnCd: "44", lDongSignguCd: "200", description: "온양온천, 외암민속마을, 현충사", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "천안시", x: 127.113893, y: 36.815129, lDongRegnCd: "44", lDongSignguCd: "131", description: "호두과자와 독립기념관, 병천 순대", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 전북특별자치도 (lDongRegnCd: 52, 6개 시)
    { name: "군산시", x: 126.736850, y: 35.967677, lDongRegnCd: "52", lDongSignguCd: "130", description: "근대문화유산 거리와 이성당 빵집, 선유도", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "김제시", x: 126.880899, y: 35.803538, lDongRegnCd: "52", lDongSignguCd: "210", description: "지평선 축제와 벽골제, 금산사", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "남원시", x: 127.390382, y: 35.416413, lDongRegnCd: "52", lDongSignguCd: "190", description: "춘향 이야기의 광한루원, 지리산 자락 육모정", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "익산시", x: 126.954181, y: 35.943641, lDongRegnCd: "52", lDongSignguCd: "140", description: "백제 미륵사지와 보석박물관, 왕궁리 유적", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "전주시", x: 127.153023, y: 35.825081, lDongRegnCd: "52", lDongSignguCd: "111", description: "한옥마을과 비빔밥·콩나물국밥 등 한식의 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "정읍시", x: 126.857679, y: 35.569909, lDongRegnCd: "52", lDongSignguCd: "180", description: "내장산 단풍과 동학농민혁명 유적지", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 전남 광주 산하 (lDongRegnCd: 12, 구 전라남도 5개 시)
    { name: "광양시", x: 127.695888, y: 34.940698, lDongRegnCd: "12", lDongSignguCd: "190", description: "매화마을 봄꽃과 광양 불고기, 이순신대교 야경", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "나주시", x: 126.710842, y: 35.015783, lDongRegnCd: "12", lDongSignguCd: "170", description: "나주곰탕과 영산포 홍어, 배 특산지", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "목포시", x: 126.392166, y: 34.811835, lDongRegnCd: "12", lDongSignguCd: "110", description: "유달산·갓바위·해상케이블카, 홍어삼합과 항구 낭만", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "순천시", x: 127.487216, y: 34.950643, lDongRegnCd: "12", lDongSignguCd: "150", description: "순천만 습지와 국가정원, 낙안읍성", themes: ["역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "여수시", x: 127.662222, y: 34.760374, lDongRegnCd: "12", lDongSignguCd: "130", description: "밤바다 야경과 돌산대교, 해상케이블카, 게장·갓김치", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 경상북도 (lDongRegnCd: 47, 10개 시)
    { name: "경산시", x: 128.741380, y: 35.825121, lDongRegnCd: "47", lDongSignguCd: "290", description: "대구 인근 대학 도시이자 대추·복숭아 산지, 반곡지 풍경", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "경주시", x: 129.226952, y: 35.856201, lDongRegnCd: "47", lDongSignguCd: "130", description: "불국사·석굴암·첨성대 등 신라 천년 고도, 황리단길", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "구미시", x: 128.344268, y: 36.119485, lDongRegnCd: "47", lDongSignguCd: "190", description: "금오산 케이블카와 금오산 올레길, 산업 도시", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "김천시", x: 128.113626, y: 36.139921, lDongRegnCd: "47", lDongSignguCd: "150", description: "직지사와 김천 포도, 부항댐 둘레길", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "문경시", x: 128.186837, y: 36.586221, lDongRegnCd: "47", lDongSignguCd: "280", description: "문경새재, 철로자전거, 찻사발 축제", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "상주시", x: 128.159118, y: 36.410947, lDongRegnCd: "47", lDongSignguCd: "250", description: "곶감·쌀·자전거 도시, 경천섬 낙동강 풍경", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "안동시", x: 128.729357, y: 36.568356, lDongRegnCd: "47", lDongSignguCd: "170", description: "하회마을·도산서원·안동찜닭 등 유교 문화 중심", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "영주시", x: 128.624068, y: 36.805679, lDongRegnCd: "47", lDongSignguCd: "210", description: "부석사와 소수서원, 무섬마을 외나무다리", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "영천시", x: 128.938600, y: 35.973268, lDongRegnCd: "47", lDongSignguCd: "230", description: "보현산 천문대와 별빛 포도, 영천 한약", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "포항시", x: 129.343481, y: 36.019017, lDongRegnCd: "47", lDongSignguCd: "113", description: "호미곶 해맞이와 영일대 해수욕장, 포항 물회와 과메기", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 경상남도 (lDongRegnCd: 48, 8개 시)
    { name: "거제시", x: 128.621082, y: 34.880642, lDongRegnCd: "48", lDongSignguCd: "310", description: "외도 보타니아, 바람의 언덕, 포로수용소", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "김해시", x: 128.889399, y: 35.228584, lDongRegnCd: "48", lDongSignguCd: "250", description: "가야 유적과 수로왕릉, 롯데워터파크", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "밀양시", x: 128.746608, y: 35.503816, lDongRegnCd: "48", lDongSignguCd: "270", description: "영남루와 얼음골, 위양못 이팝나무", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "사천시", x: 128.064227, y: 35.003780, lDongRegnCd: "48", lDongSignguCd: "240", description: "사천 바다케이블카와 삼천포 대교 풍경, 실안낙조", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "양산시", x: 129.037265, y: 35.334998, lDongRegnCd: "48", lDongSignguCd: "330", description: "통도사와 배내골 계곡, 에덴밸리 리조트", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "진주시", x: 128.107606, y: 35.180211, lDongRegnCd: "48", lDongSignguCd: "170", description: "진주성과 남강 유등축제, 진주냉면과 비빔밥", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "창원시", x: 128.681816, y: 35.228042, lDongRegnCd: "48", lDongSignguCd: "125", description: "진해 군항제 벚꽃과 마산 어시장, 합포만 해안", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "통영시", x: 128.433182, y: 34.854421, lDongRegnCd: "48", lDongSignguCd: "220", description: "한려수도 바다 풍경과 동피랑 벽화, 충무김밥과 꿀빵", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },

    // 제주특별자치도 (lDongRegnCd: 50, 산하 행정시 2개)
    { name: "제주시", x: 126.531188, y: 33.499621, lDongRegnCd: "50", lDongSignguCd: "110", description: "한라산 북쪽, 용두암·협재·함덕 해변, 흑돼지거리와 올레시장", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] },
    { name: "서귀포시", x: 126.560076, y: 33.254120, lDongRegnCd: "50", lDongSignguCd: "130", description: "천지연폭포·성산일출봉·주상절리 등 제주 남부 자연 명소 총집합", themes: ["자연관광", "역사관광", "레저스포츠", "체험관광", "문화관광"] }
]
