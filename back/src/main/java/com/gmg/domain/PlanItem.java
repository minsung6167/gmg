package com.gmg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "plan_items")
public class PlanItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long planId;

    private int dayNumber;

    private int orderInDay;

    private String itemType;

    private Long placeId;

    private String placeName;

    private Double mapx;

    private Double mapy;

    private String startTime;

    private int stayMinutes;

    private Integer travelMinutes;

    private String reason;

    private String warning;

    protected PlanItem() {
    }

    public PlanItem(Long planId, int dayNumber, int orderInDay, String itemType,
            Long placeId, String placeName, Double mapx, Double mapy,
            String startTime, int stayMinutes, Integer travelMinutes, String reason, String warning) {
        this.planId = planId;
        this.dayNumber = dayNumber;
        this.orderInDay = orderInDay;
        this.itemType = itemType;
        this.placeId = placeId;
        this.placeName = placeName;
        this.mapx = mapx;
        this.mapy = mapy;
        this.startTime = startTime;
        this.stayMinutes = stayMinutes;
        this.travelMinutes = travelMinutes;
        this.reason = reason;
        this.warning = warning;
    }

    public Long getId() {
        return id;
    }

    public Long getPlanId() {
        return planId;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public int getOrderInDay() {
        return orderInDay;
    }

    public String getItemType() {
        return itemType;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public String getPlaceName() {
        return placeName;
    }

    public Double getMapx() {
        return mapx;
    }

    public Double getMapy() {
        return mapy;
    }

    public String getStartTime() {
        return startTime;
    }

    public int getStayMinutes() {
        return stayMinutes;
    }

    public Integer getTravelMinutes() {
        return travelMinutes;
    }

    public String getReason() {
        return reason;
    }

    public String getWarning() {
        return warning;
    }
}
