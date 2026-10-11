package com.gmg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmg.service.PlanService;
import com.gmg.domain.Plan;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;  
import java.util.Map;       

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    private Long getLoginUserNo(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null) {
            return null;
        }
        return (Long) session.getAttribute("user_no");
    }

    @GetMapping
    public ResponseEntity<?> myPlans(HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(planService.getMyPlans(userNo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlan(@PathVariable Long id, HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }
        Plan plan = planService.getMyPlan(id, userNo);
        if (plan == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(plan);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> request, HttpServletRequest httpRequest) {
        Long userNo = getLoginUserNo(httpRequest);
        if (userNo == null) {
            return ResponseEntity.status(401).build();
        }

        int headcount = Integer.parseInt(String.valueOf(request.get("headcount")));
        LocalDate startDate = LocalDate.parse((String) request.get("startDate"));
        LocalDate endDate = LocalDate.parse((String) request.get("endDate"));
        boolean hasCar = Boolean.TRUE.equals(request.get("hasCar"));

        Plan plan = planService.createPlan(
                userNo,
                (String) request.get("regionName"),
                (String) request.get("regionImage"),
                (String) request.get("lDongRegnCd"),
                (String) request.get("lDongSignguCd"),
                headcount,
                startDate,
                endDate,
                (String) request.get("companionType"),
                (String) request.get("theme"),
                hasCar);
        return ResponseEntity.ok(plan);
    }
}
