package com.gmg.dao;

import com.gmg.domain.TourSpot;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * tour_spots 테이블 접근용
 *
 * JpaRepository가 기본으로 주는 것:
 *   - save()      : 장소 1개 저장 (Part 2 미리 저장할 때)
 *   - saveAll()   : 여러 개 한 번에 저장
 *   - findById()  : contentId로 1개 찾기
 *   - findAll()   : 전체 장소 가져오기
 *
 * 아래 메서드는 "이름 규칙"만 지키면 Spring이 쿼리를 자동 생성한다.
 */
public interface TourSpotRepository extends JpaRepository<TourSpot, Long> {
    // TourSpot = 엔티티, Long = PK 타입(contentId)
    /*
     * 랜덤으로 지역이 뽑혔을 때 사용.
     * 예: 대전 → regionCode / sigunguCode로 그 지역 장소만 꺼냄.
     * Part 2 TOP20 API에서 이 목록을 가져온 뒤 별점이랑 조인한다.
     */
    List<TourSpot> findByRegionCodeAndSigunguCode(String regionCode, String sigunguCode);

    /*
     * 광역시처럼 sigunguCode가 null인 지역용.
     * (필요하면 Part 2에서 사용)
     */
    List<TourSpot> findByRegionCode(String regionCode);
}