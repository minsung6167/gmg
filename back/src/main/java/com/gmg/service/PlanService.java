package com.gmg.service;

import com.gmg.dao.PlanItemRepository;
import com.gmg.dao.PlanRepository;
import com.gmg.domain.Favorite;
import com.gmg.domain.Plan;
import com.gmg.domain.PlanItem;
import java.util.Map;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final FavoriteService favoriteService;
    private final ClusteringService clusteringService;
    private final GeminiService geminiService;

    private final PlanItemRepository planItemRepository;

    private final KakaoRouteService kakaoRouteService;

    public PlanService(PlanRepository planRepository, FavoriteService favoriteService,
            ClusteringService clusteringService, GeminiService geminiService,
            PlanItemRepository planItemRepository, KakaoRouteService kakaoRouteService) {
        this.planRepository = planRepository;
        this.favoriteService = favoriteService;
        this.clusteringService = clusteringService;
        this.geminiService = geminiService;
        this.planItemRepository = planItemRepository;
        this.kakaoRouteService = kakaoRouteService;
    }

    public List<Plan> getMyPlans(Long userNo) {
        return planRepository.findByUserNoOrderByIdDesc(userNo);
    }

    public Plan createPlan(Long userNo, String regionName, String regionImage, String regionCode, String sigunguCode,
            int headcount, LocalDate startDate, LocalDate endDate,
            String companionType, String theme, boolean hasCar) {
        Plan plan = new Plan(userNo, regionName, regionImage, regionCode, sigunguCode,
                headcount, startDate, endDate, companionType, theme, hasCar);
        return planRepository.save(plan);
    }

    public Plan getMyPlan(Long planId, Long userNo) {
        Plan plan = planRepository.findById(planId).orElse(null);
        if (plan == null || !plan.getUserNo().equals(userNo)) {
            return null;
        }
        return plan;
    }

    public Map makeAiPlan(Long planId) {
        Plan plan = planRepository.findById(planId).orElse(null);
        List<Favorite> places = favoriteService.getFavorites(planId);

        int dayCount = 0;
        LocalDate day = plan.getStartDate();
        while (day.isAfter(plan.getEndDate()) == false) {
            dayCount = dayCount + 1;
            day = day.plusDays(1);
        }

        List<List<Favorite>> groups = clusteringService.cluster(places, dayCount);
        Map schedule = geminiService.makeSchedule(plan.getStartDate(), plan.getEndDate(), groups, plan.isHasCar());
        List<PlanItem> oldItems = planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
        for (int i = 0; i < oldItems.size(); i++) {
            planItemRepository.delete(oldItems.get(i));
        }
        List days = (List) schedule.get("days");

        for (int d = 0; d < days.size(); d++) {
            Map dayMap = (Map) days.get(d);
            int dayNumber = ((Number) dayMap.get("dayNumber")).intValue();
            int groupIndex = ((Number) dayMap.get("groupIndex")).intValue();
            List items = (List) dayMap.get("items");

            List<Favorite> group = groups.get(groupIndex);
            int[][] table = kakaoRouteService.getTravelTable(group, plan.isHasCar());
            LocalTime clock = LocalTime.of(10, 0);
            int dayMinutes = 10 * 60;
            Long lastPlaceId = null;

            for (int i = 0; i < items.size(); i++) {
                Map item = (Map) items.get(i);
                String type = (String) item.get("type");
                int stayMinutes = ((Number) item.get("stayMinutes")).intValue();
                String reason = (String) item.get("reason");
                String warning = (String) item.get("warning");

                Long placeId = null;
                String placeName = null;
                Double mapx = null;
                Double mapy = null;
                if (type.equals("PLACE")) {
                    placeId = ((Number) item.get("placeId")).longValue();
                    lastPlaceId = placeId;
                    for (Favorite place : places) {
                        if (place.getPlaceId().equals(placeId)) {
                            placeName = place.getPlaceName();
                            mapx = place.getMapx();
                            mapy = place.getMapy();
                        }
                    }
                }

                Integer travelMinutes = null;
                if (i < items.size() - 1) {
                    Map nextItem = (Map) items.get(i + 1);
                    String nextType = (String) nextItem.get("type");
                    if (nextType.equals("PLACE") == false) {
                        travelMinutes = 0;
                    } else {
                        Long fromId = placeId;
                        if (fromId == null) {
                            fromId = lastPlaceId;
                        }
                        Long toId = ((Number) nextItem.get("placeId")).longValue();
                        int from = 0;
                        int to = 0;
                        for (int g = 0; g < group.size(); g++) {
                            if (group.get(g).getPlaceId().equals(fromId)) {
                                from = g;
                            }
                            if (group.get(g).getPlaceId().equals(toId)) {
                                to = g;
                            }
                        }
                        travelMinutes = table[from][to];
                    }
                }

                String startTime = clock.toString();
                if (dayMinutes + stayMinutes >= 24 * 60) {
                    if (warning == null || warning.equals("")) {
                        warning = "자정을 넘깁니다";
                    }
                }
                PlanItem planItem = new PlanItem(
                        planId, dayNumber, i, type,
                        placeId, placeName, mapx, mapy,
                        startTime, stayMinutes, travelMinutes, reason, warning);
                planItemRepository.save(planItem);

                clock = clock.plusMinutes(stayMinutes);
                if (travelMinutes != null) {
                    clock = clock.plusMinutes(travelMinutes);
                }
                dayMinutes = dayMinutes + stayMinutes;
                if (travelMinutes != null) {
                    dayMinutes = dayMinutes + travelMinutes;
                }
            }
        }

        return schedule;
    }

    public List<PlanItem> getPlanItems(Long planId) {
        return planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
    }

    public List<PlanItem> updateStay(Long planId, Long itemId, int stayMinutes) {
        List<PlanItem> items = planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
        int dayNumber = 0;
        for (PlanItem item : items) {
            if (item.getId().equals(itemId)) {
                item.setStayMinutes(stayMinutes);
                dayNumber = item.getDayNumber();
            }
        }

        LocalTime clock = null;
        int dayMinutes = 0;
        for (PlanItem item : items) {
            if (item.getDayNumber() != dayNumber) {
                continue;
            }
            if (clock == null) {
                clock = LocalTime.parse(item.getStartTime());
                dayMinutes = clock.getHour() * 60 + clock.getMinute();
            }
            item.setStartTime(clock.toString());
            if (dayMinutes + item.getStayMinutes() >= 24 * 60) {
                if (item.getWarning() == null || item.getWarning().equals("")) {
                    item.setWarning("자정을 넘깁니다");
                }
            }
            clock = clock.plusMinutes(item.getStayMinutes());
            if (item.getTravelMinutes() != null) {
                clock = clock.plusMinutes(item.getTravelMinutes());
            }
            dayMinutes = dayMinutes + item.getStayMinutes();
            if (item.getTravelMinutes() != null) {
                dayMinutes = dayMinutes + item.getTravelMinutes();
            }
            planItemRepository.save(item);
        }
        return planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
    }

    public List<PlanItem> updateDayStart(Long planId, int dayNumber, String startTime) {
        List<PlanItem> items = planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
        LocalTime clock = LocalTime.parse(startTime);
        int dayMinutes = clock.getHour() * 60 + clock.getMinute();
        for (PlanItem item : items) {
            if (item.getDayNumber() != dayNumber) {
                continue;
            }
            item.setStartTime(clock.toString());
            if (dayMinutes + item.getStayMinutes() >= 24 * 60) {
                if (item.getWarning() == null || item.getWarning().equals("")) {
                    item.setWarning("자정을 넘깁니다");
                }
            } else {
                if (item.getWarning() != null && item.getWarning().equals("자정을 넘깁니다")) {
                    item.setWarning(null);
                }
            }
            clock = clock.plusMinutes(item.getStayMinutes());
            if (item.getTravelMinutes() != null) {
                clock = clock.plusMinutes(item.getTravelMinutes());
            }
            dayMinutes = dayMinutes + item.getStayMinutes();
            if (item.getTravelMinutes() != null) {
                dayMinutes = dayMinutes + item.getTravelMinutes();
            }
            planItemRepository.save(item);
        }
        return planItemRepository.findByPlanIdOrderByDayNumberAscOrderInDayAsc(planId);
    }
}
