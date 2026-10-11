package com.gmg.service;

import com.gmg.dao.PlanRepository;
import com.gmg.domain.Plan;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
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
}
