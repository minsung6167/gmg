package com.gmg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmg.dao.PlanRepository;
import com.gmg.domain.Plan;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanRepository planRepository;

    public PlanController(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @GetMapping
    public ResponseEntity<?> myPlans(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user_no") == null) {
            return ResponseEntity.status(401).build();
        }
        Long userNo = (Long) session.getAttribute("user_no");
        return ResponseEntity.ok(planRepository.findByUserNoOrderByIdDesc(userNo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlan(@PathVariable Long id, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user_no") == null) {
            return ResponseEntity.status(401).build();
        }
        Long userNo = (Long) session.getAttribute("user_no");

        Plan plan = planRepository.findById(id).orElse(null);
        if (plan == null || !plan.getUserNo().equals(userNo)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(plan);
    }
}
