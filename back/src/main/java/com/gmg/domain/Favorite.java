package com.gmg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long planId;

    @Column(nullable = false)
    private Long placeId;

    private String placeName;

    private String placeImage;

    private Double rating;

    protected Favorite() {
    }

    public Favorite(Long planId, Long placeId, String placeName, String placeImage, Double rating) {
        this.planId = planId;
        this.placeId = placeId;
        this.placeName = placeName;
        this.placeImage = placeImage;
        this.rating = rating;
    }
        public Long getId() {
        return id;
    }

    public Long getPlanId() {
        return planId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public String getPlaceName() {
        return placeName;
    }

    public String getPlaceImage() {
        return placeImage;
    }

    public Double getRating() {
        return rating;
    }

}