package com.gmg.controller;

import com.gmg.service.FavoriteService;
import com.gmg.domain.Favorite;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;  
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plans/{planId}/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    private Long getLoginUserNo(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null) {
            return null;
        }
        return (Long) session.getAttribute("user_no");
    }

    @GetMapping
    public ResponseEntity<?> list(@PathVariable Long planId, HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }
        if (!favoriteService.isMyPlan(planId, userNo)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(favoriteService.getFavorites(planId));
    }
    
    @PostMapping
    public ResponseEntity<?> add(@PathVariable Long planId, @RequestBody Map<String, Object> request, HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }
        if (!favoriteService.isMyPlan(planId, userNo)) {
            return ResponseEntity.status(404).build();
        }

        Long placeId = ((Number) request.get("placeId")).longValue();
        String placeName = (String) request.get("placeName");
        String placeImage = (String) request.get("placeImage");
        Number rating = (Number) request.get("rating");

        Favorite favorite = favoriteService.addFavorite(
                planId,
                placeId,
                placeName,
                placeImage,
                rating == null ? null : rating.doubleValue());
        return ResponseEntity.ok(favorite);
    }
    
    @DeleteMapping("/{placeId}")
    public ResponseEntity<?> remove(@PathVariable Long planId, @PathVariable Long placeId, HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }
        if (!favoriteService.isMyPlan(planId, userNo)) {
            return ResponseEntity.status(404).build();
        }
        favoriteService.removeFavorite(planId, placeId);
        return ResponseEntity.ok().build();
    }

}