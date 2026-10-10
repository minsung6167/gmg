package com.gmg.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gmg.domain.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByUserNoOrderByIdDesc(Long userNo);
}
