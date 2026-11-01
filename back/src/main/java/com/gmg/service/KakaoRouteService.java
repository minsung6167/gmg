package com.gmg.service;

import com.gmg.domain.Favorite;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoRouteService {

    @Value("${kakao.rest.key}")
    private String restKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private int getWalkMinutes(double fromX, double fromY, double toX, double toY) {
        String url = "https://dapi.kakao.com/v2/routing/walk"
                + "?start_x=" + fromX + "&start_y=" + fromY
                + "&end_x=" + toX + "&end_y=" + toY;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + restKey);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), Map.class);

        Map<String, Object> body = response.getBody();
        if (!"OK".equals(body.get("status"))) {
            return -1;
        }
        Map<String, Object> route = (Map<String, Object>) body.get("route");
        Map<String, Object> properties = (Map<String, Object>) route.get("properties");
        int seconds = ((Number) properties.get("totalTime")).intValue();
        return Math.round(seconds / 60f);
    }

    private int getTransitMinutes(double fromX, double fromY, double toX, double toY) {
        String url = "https://dapi.kakao.com/v2/routing/publictraffic"
                + "?start_x=" + fromX + "&start_y=" + fromY
                + "&end_x=" + toX + "&end_y=" + toY;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + restKey);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), Map.class);
        Map<String, Object> body = response.getBody();

        if (!"OK".equals(body.get("status"))) {
            return -1;
        }

        List<Map<String, Object>> routes = (List<Map<String, Object>>) body.get("routes");
        int best = Integer.MAX_VALUE;
        for (Map<String, Object> route : routes) {
            Map<String, Object> properties = (Map<String, Object>) route.get("properties");
            int seconds = ((Number) properties.get("totalTime")).intValue();
            if (seconds < best) {
                best = seconds;
            }
        }
        return Math.round(best / 60f);
    }

    private int getCarMinutes(double fromX, double fromY, double toX, double toY) {
        String url = "https://apis-navi.kakaomobility.com/v1/directions"
                + "?origin=" + fromX + "," + fromY
                + "&destination=" + toX + "," + toY
                + "&summary=true";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + restKey);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), Map.class);

        List<Map<String, Object>> routes = (List<Map<String, Object>>) response.getBody().get("routes");
        Map<String, Object> summary = (Map<String, Object>) routes.get(0).get("summary");
        int seconds = ((Number) summary.get("duration")).intValue();
        return Math.round(seconds / 60f);
    }

    public int getTravelMinutes(double fromX, double fromY, double toX, double toY, boolean hasCar) {
        if (hasCar) {
            return getCarMinutes(fromX, fromY, toX, toY);
        }
        int walk = getWalkMinutes(fromX, fromY, toX, toY);
        int transit = getTransitMinutes(fromX, fromY, toX, toY);
        if (walk == -1) {
            return transit;
        }
        if (transit == -1) {
            return walk;
        }
        return Math.min(walk, transit);
    }

    public int[][] getTravelTable(List<Favorite> places, boolean hasCar) {
        int n = places.size();
        int[][] table = new int[n][n];
        for (int from = 0; from < n; from++) {
            for (int to = 0; to < n; to++) {
                if (from == to) {
                    continue;
                }
                Favorite a = places.get(from);
                Favorite b = places.get(to);
                table[from][to] = getTravelMinutes(a.getMapx(), a.getMapy(), b.getMapx(), b.getMapy(), hasCar);
            }
        }
        return table;
    }
}
