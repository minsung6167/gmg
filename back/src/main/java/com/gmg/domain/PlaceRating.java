package com.gmg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
 * 별점 테이블
 * 카카오 로컬 API로 전체 장소 별점을 미리 저장한다.
 * 연결 흐름: tour_spots.contentId ←→ place_rating.contentId
 * 랜덤 지역이 뽑히면:
 *   1) tour_spots에서 그 지역 장소 목록
 *   2) contentId로 이 테이블 별점 조회
 *   3) 별점 높은 순 TOP20
 */
@Entity
@Table(name = "place_rating")
public class PlaceRating {
    // 별점 행 자체의 번호. DB가 1, 2, 3... 자동 부여.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 관광지 테이블의 contentId를 가리킴 (FK역할).
    // nullable=false: 반드시 있어야 함
    // unique=true: 한 장소당 별점 행은 1개만
    @Column(nullable = false, unique = true)
    private Long contentId;
    private Double rating; // 별점 점수
    // JPA용 빈 생성자

    protected PlaceRating() {
    }

    // 별점 저장: new PlaceRating(contentId, rating) 후 save()
    public PlaceRating(Long contentId, Double rating) {
        this.contentId = contentId;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public Long getContentId() {
        return contentId;
    }

    public Double getRating() {
        return rating;
    }
}
