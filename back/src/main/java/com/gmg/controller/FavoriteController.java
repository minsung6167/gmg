package com.gmg.controller;

import com.gmg.dao.FavoriteRepository;
import com.gmg.dao.PlanRepository;
import com.gmg.domain.Favorite;  
import com.gmg.domain.Plan;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;  
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plans/{planId}/favorites")
public class FavoriteController {

    private final FavoriteRepository favoriteRepository;
    private final PlanRepository planRepository;

    public FavoriteController(FavoriteRepository favoriteRepository, PlanRepository planRepository) {
        this.favoriteRepository = favoriteRepository;
        this.planRepository = planRepository;
    }
    private boolean isMyPlan(Long planId, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user_no") == null) {
            return false;
        }
        Long userNo = (Long) session.getAttribute("user_no");

        Plan plan = planRepository.findById(planId).orElse(null);
        return plan != null && plan.getUserNo().equals(userNo);
    }
    @GetMapping
    public ResponseEntity<?> list(@PathVariable Long planId, HttpServletRequest httpRequest) {
        if (!isMyPlan(planId, httpRequest)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(favoriteRepository.findByPlanId(planId));
    }
    @PostMapping
    public ResponseEntity<?> add(@PathVariable Long planId, @RequestBody Map<String, Object> request, HttpServletRequest httpRequest) {
        if (!isMyPlan(planId, httpRequest)) {
            return ResponseEntity.status(404).build();
        }
        Long placeId = ((Number) request.get("placeId")).longValue();

        if (favoriteRepository.findByPlanIdAndPlaceId(planId, placeId).isPresent()) {
            return ResponseEntity.ok().build();
        }

        Number rating = (Number) request.get("rating");
        Favorite favorite = new Favorite(
                planId,
                placeId,
                (String) request.get("placeName"),
                (String) request.get("placeImage"),
                rating == null ? null : rating.doubleValue());
        favoriteRepository.save(favorite);
        return ResponseEntity.ok(favorite);
    }
}