package com.gmg.service;

import com.gmg.dao.FavoriteRepository;
import com.gmg.dao.PlanRepository;
import com.gmg.domain.Plan;
import com.gmg.domain.Favorite;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PlanRepository planRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, PlanRepository planRepository) {
        this.favoriteRepository = favoriteRepository;
        this.planRepository = planRepository;
    }

    public boolean isMyPlan(Long planId, Long userNo) {
        Plan plan = planRepository.findById(planId).orElse(null);
        return plan != null && plan.getUserNo().equals(userNo);
    }

    public List<Favorite> getFavorites(Long planId) {
        return favoriteRepository.findByPlanId(planId);
    }

    public Favorite addFavorite(Long planId, Long placeId, String placeName, String placeImage, Double rating) {
        Favorite existing = favoriteRepository.findByPlanIdAndPlaceId(planId, placeId).orElse(null);
        if (existing != null) {
            return existing;
        }
        Favorite favorite = new Favorite(planId, placeId, placeName, placeImage, rating);
        return favoriteRepository.save(favorite);
    }

        public void removeFavorite(Long planId, Long placeId) {
        Favorite favorite = favoriteRepository.findByPlanIdAndPlaceId(planId, placeId).orElse(null);
        if (favorite != null) {
            favoriteRepository.delete(favorite);
        }
    }

}
