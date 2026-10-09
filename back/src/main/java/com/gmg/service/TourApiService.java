package com.gmg.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TourApiService {

    @Value("${tour.api.key}")
    private String serviceKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getSpotsByRegion(String lDongRegnCd, String lDongSignguCd) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("https://apis.data.go.kr/B551011/KorService2/areaBasedList2")
                .queryParam("serviceKey", serviceKey)
                .queryParam("lDongRegnCd", lDongRegnCd)
                .queryParam("numOfRows", 20)
                .queryParam("arrange", "O")
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "GMG")
                .queryParam("_type", "json");

        if (lDongSignguCd != null && !lDongSignguCd.isBlank()) {
            builder.queryParam("lDongSignguCd", lDongSignguCd);
        }

        try {
            return restTemplate.getForObject(builder.build(false).toUriString(), String.class);
        } catch (RestClientException e) {
            throw new TourApiException("TourAPI 호출 실패", e);
        }
    }
}
