package com.gmg.controller;

import com.gmg.service.TourApiException;
import com.gmg.service.TourApiService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TourApiController {

    private final TourApiService tourApiService;

    public TourApiController(TourApiService tourApiService) {
        this.tourApiService = tourApiService;
    }

    @GetMapping(value = "/tour-spots", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTourSpots(
            @RequestParam String lDongRegnCd,
            @RequestParam(required = false) String lDongSignguCd) {
        try {
            return ResponseEntity.ok(tourApiService.getSpotsByRegion(lDongRegnCd, lDongSignguCd));
        } catch (TourApiException e) {
            return ResponseEntity.status(502).body("관광지 정보를 불러오지 못했습니다.");
        }
    }
}
