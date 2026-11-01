package com.gmg.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TourDetailService {
    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService2";

    @Value("${tour.api.key}")
    private String serviceKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private Map<String, Object> getFirstItem(String url) {
        Map<String, Object> body = restTemplate.getForObject(url, Map.class);
        Map<String, Object> response = (Map<String, Object>) body.get("response");
        Map<String, Object> responseBody = (Map<String, Object>) response.get("body");
        Map<String, Object> items = (Map<String, Object>) responseBody.get("items");

        List<Map<String, Object>> itemList = (List<Map<String, Object>>) items.get("item");
        return itemList.get(0);
    }

    public Map<String, String> getPlaceInfo(Long contentId) {
        String commonUrl = BASE_URL + "/detailCommon2"
                + "?serviceKey=" + serviceKey
                + "&MobileOS=ETC&MobileApp=GMG&_type=json"
                + "&contentId=" + contentId;
        Map<String, Object> common = getFirstItem(commonUrl);
        String contentTypeId = (String) common.get("contenttypeid");
        String overview = (String) common.get("overview");

        String introUrl = BASE_URL + "/detailIntro2"
                + "?serviceKey=" + serviceKey
                + "&MobileOS=ETC&MobileApp=GMG&_type=json"
                + "&contentId=" + contentId
                + "&contentTypeId=" + contentTypeId;
        Map<String, Object> intro = getFirstItem(introUrl);

        String hours = "";
        String closedDays = "";

        for (String key : intro.keySet()) {
            String value = (String) intro.get(key);
            if (key.contains("usetime") || key.contains("opentime") || key.contains("playtime")) {
                hours = hours + value + " ";
            }
            if (key.contains("restdate")) {
                closedDays = closedDays + value + " ";
            }
        }

        Map<String, String> info = new HashMap<>();
        info.put("overview", overview);
        info.put("hours", hours.trim());
        info.put("closedDays", closedDays.trim());
        return info;
    }

}
