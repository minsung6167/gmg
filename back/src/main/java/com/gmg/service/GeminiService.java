package com.gmg.service;

import com.gmg.domain.Favorite;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import tools.jackson.databind.json.JsonMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

@Service
public class GeminiService {
    private static final String URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final TourDetailService tourDetailService;
    private final KakaoRouteService kakaoRouteService;

    public GeminiService(TourDetailService tourDetailService, KakaoRouteService kakaoRouteService) {
        this.tourDetailService = tourDetailService;
        this.kakaoRouteService = kakaoRouteService;
    }

    public Map geminiAsk(String prompt) {
        Map<String, Object> textItem = new HashMap<>();
        textItem.put("text", prompt);

        Map<String, Object> message = new HashMap<>();
        message.put("parts", List.of(textItem));

        Map<String, Object> jsonSetting = new HashMap<>();
        jsonSetting.put("responseMimeType", "application/json");

        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(message));
        body.put("generationConfig", jsonSetting);

        HttpHeaders keyHeader = new HttpHeaders();
        keyHeader.set("x-goog-api-key", apiKey);

        Map geminiAnswer = restTemplate.postForObject(
                URL,
                new HttpEntity<>(body, keyHeader),
                Map.class);

        List answerList = (List) geminiAnswer.get("candidates");
        Map firstAnswer = (Map) answerList.get(0);
        Map answerContent = (Map) firstAnswer.get("content");
        List answerParts = (List) answerContent.get("parts");

        String text = (String) ((Map) answerParts.get(0)).get("text");
        JsonMapper mapper = new JsonMapper();
        return mapper.readValue(text, Map.class);
    }

    public String makePrompt(LocalDate startDate, LocalDate endDate, List<List<Favorite>> groups, boolean hasCar) {
        String prompt = """
                너는 여행 일정을 짜는 도우미다.
                규칙을 지켜라.
                1. 그룹 하나를 하루로 쓴다. 그룹을 쪼개거나 섞지 마라.
                2. 장소 휴무일과 여행 요일을 보고, 어느 그룹을 며칠 차에 둘지 정한다.
                3. 하루 안 순서는 운영시간과 설명을 보고 정한다. 오전만 열리면 앞에, 야경이면 저녁에 둔다.
                4. 빈 시간에 점심식사, 저녁식사, 자유시간을 넣는다. 식당 이름은 쓰지 마라.
                5. 받은 장소만 쓰고, 각 장소는 한 번만 쓴다.
                6. 하루는 10:00에 시작한다. 시작 시각은 답에 쓰지 마라. 우리가 계산한다.
                7. type은 아래 영어만 쓴다. PLACE=장소, LUNCH=점심식사, DINNER=저녁식사, FREE=자유시간.
                8. 아래 JSON 모양으로만 답한다.
                {
                  "days": [
                    {
                      "dayNumber": 1,
                      "groupIndex": 0,
                      "items": [
                        { "type": "PLACE", "placeId": 123, "stayMinutes": 90, "reason": "이유", "warning": null },
                        { "type": "LUNCH", "stayMinutes": 60, "reason": "이유" },
                        { "type": "PLACE", "placeId": 456, "stayMinutes": 60, "reason": "이유", "warning": null },
                        { "type": "FREE", "stayMinutes": 30, "reason": "이유" },
                        { "type": "DINNER", "stayMinutes": 90, "reason": "이유" }
                      ]
                    }
                  ]
                }
                """;
        String[] weekNames = { "월", "화", "수", "목", "금", "토", "일" };

        prompt = prompt + "여행 날짜:\n";
        int dayNumber = 1;
        LocalDate day = startDate;
        while (day.isAfter(endDate) == false) {
            prompt = prompt + dayNumber + "일차 " + day + "(" + weekNames[day.getDayOfWeek().getValue() - 1] + ")\n";
            day = day.plusDays(1);
            dayNumber = dayNumber + 1;
        }

        prompt = prompt + "장소 그룹:\n";
        for (int g = 0; g < groups.size(); g++) {
            prompt = prompt + "그룹 " + g + ": ";
            List<Favorite> group = groups.get(g);
            for (int p = 0; p < group.size(); p++) {
                Favorite place = group.get(p);
                Map<String, String> placeInfo = tourDetailService.getPlaceInfo(place.getPlaceId());
                prompt = prompt + place.getPlaceName()
                        + "(placeId " + place.getPlaceId()
                        + ", 운영: " + placeInfo.get("hours")
                        + ", 휴무: " + placeInfo.get("closedDays")
                        + ", 설명: " + placeInfo.get("overview")
                        + ")";
                if (p < group.size() - 1) {
                    prompt = prompt + ", ";
                }
            }
            prompt = prompt + "\n";
        }

        prompt = prompt + "이동시간:\n";
        for (int g = 0; g < groups.size(); g++) {
            List<Favorite> group = groups.get(g);
            int[][] table = kakaoRouteService.getTravelTable(group, hasCar);
            prompt = prompt + "그룹 " + g + ":\n";
            for (int from = 0; from < group.size(); from++) {
                for (int to = 0; to < group.size(); to++) {
                    if (from == to) {
                        continue;
                    }
                    prompt = prompt + group.get(from).getPlaceName()
                            + " -> " + group.get(to).getPlaceName()
                            + ": " + table[from][to] + "분\n";
                }
            }
        }
        return prompt;
    }

    public Map makeSchedule(LocalDate startDate, LocalDate endDate, List<List<Favorite>> groups, boolean hasCar) {
        String prompt = makePrompt(startDate, endDate, groups, hasCar);
        return geminiAsk(prompt);
    }
}
