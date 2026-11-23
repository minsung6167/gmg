package com.gmg.dao;

import com.gmg.domain.PlaceRating;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * place_rating 테이블 접근용
 *
 * 흐름:
 *   1) Part 2에서 별점 미리 저장 → save()
 *   2) 장소 contentId로 별점 찾기 → findByContentId()
 *   3) TOP20은 나중에 서비스에서 장소 목록 + 별점을 맞춰 정렬
 */
public interface PlaceRatingRepository extends
        JpaRepository<PlaceRating, Long> {
    // PlaceRating = 엔티티, Long = PK 타입(id)
    /*
     * 관광지 contentId로 별점 1건 조회.
     * Optional: 있으면 값, 없으면 empty (아직 별점 없는 장소 대비)
     */
    Optional<PlaceRating> findByContentId(Long contentId);
}