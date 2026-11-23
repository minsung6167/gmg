package com.gmg.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
 * 관광지(장소) 테이블
 * TourAPI로 "전국 모든 시·모든장소"를 미리 저장한다.
 * 랜덤으로 지역이 뽑히면, 이 테이블에서 그 지역 장소만 꺼낸다.
*/
@Entity
@Table(name = "tour_spots") // 실제 DB 테이블 이름
public class TourSpot {
    // TourAPI가 주는 장소 고유번호. 우리 DB의 기본키(PK)로 사용.
    // 나중에 별점 테이블(place_rating)과 이 번호로 연결한다.
    @Id
    private Long contentId;
    private String title; // 장소 이름 (화면에 표시)
    private String addr; // 주소
    private String image; // 대표 사진 URL
    private Double mapx; // 경도 (지도 마커 X)
    private Double mapy; // 위도 (지도 마커 Y)
    // 지역 필터용. 예: 대전이면 regionCode만 쓰고 sigunguCode는 null일 수 있음.
    // "대전이 뽑히면 대전 장소만" → 이 두 컬럼으로 찾는다.
    private String regionCode;
    private String sigunguCode;
    // Part 3 탭용: 관광지 / 레저스포츠 / 식당 / 축제
    private String category;

    // JPA가 DB에서 읽어올 때 사용하는 빈 생성자. 우리가 직접 호출할 일 거의 없음.
    protected TourSpot() {
    }

    // Part 2에서 TourAPI 응답을 받을 때: new TourSpot(...) 후 save()
    public TourSpot(Long contentId, String title, String addr, String image,
            Double mapx, Double mapy, String regionCode, String sigunguCode, String category) {
        this.contentId = contentId;
        this.title = title;
        this.addr = addr;
        this.image = image;
        this.mapx = mapx;
        this.mapy = mapy;
        this.regionCode = regionCode;
        this.sigunguCode = sigunguCode;
        this.category = category;
    }

    // 아래 getter: 서비스/API에서 값을 읽을 때 사용
    public Long getContentId() {
        return contentId;
    }

    public String getTitle() {
        return title;
    }

    public String getAddr() {
        return addr;
    }

    public String getImage() {
        return image;
    }

    public Double getMapx() {
        return mapx;
    }

    public Double getMapy() {
        return mapy;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public String getSigunguCode() {
        return sigunguCode;
    }

    public String getCategory() {
        return category;
    }
}