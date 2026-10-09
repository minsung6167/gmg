package com.gmg.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gmg.domain.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByPlanId(Long planId);

    Optional<Favorite> findByPlanIdAndPlaceId(Long planId, Long placeId);
}
