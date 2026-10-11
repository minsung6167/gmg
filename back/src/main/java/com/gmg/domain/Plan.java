package com.gmg.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;


@Entity
@Table(name = "plans")
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userNo;

    private String regionName;

    private String regionImage;

    private String regionCode;

    private String sigunguCode;

    private int headcount;

    private LocalDate startDate;

    private LocalDate endDate;

    private String companionType;

    private String theme;

    private boolean hasCar;

    protected Plan() {
    }

    public Plan(Long userNo, String regionName, String regionImage, String regionCode, String sigunguCode,
            int headcount, LocalDate startDate, LocalDate endDate,
            String companionType, String theme, boolean hasCar) {
        this.userNo = userNo;
        this.regionName = regionName;
        this.regionImage = regionImage;
        this.regionCode = regionCode;
        this.sigunguCode = sigunguCode;
        this.headcount = headcount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.companionType = companionType;
        this.theme = theme;
        this.hasCar = hasCar;
    }

    public Long getId() {
        return id;
    }

    public Long getUserNo() {
        return userNo;
    }

    public String getRegionName() {
        return regionName;
    }

    public String getRegionImage() {
        return regionImage;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public String getSigunguCode() {
        return sigunguCode;
    }

    public int getHeadcount() {
        return headcount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getCompanionType() {
        return companionType;
    }

    public String getTheme() {
        return theme;
    }

    public boolean isHasCar() {
        return hasCar;
    }

}
