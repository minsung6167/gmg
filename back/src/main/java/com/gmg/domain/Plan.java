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

    private int headcount;

    private LocalDate startDate;

    private LocalDate endDate;

    private String companionType;

    private String theme;

    private boolean hasCar;

    protected Plan() {
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
