package com.gmg.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gmg.domain.PlanItem;

public interface PlanItemRepository extends JpaRepository<PlanItem, Long> {
    List<PlanItem> findByPlanIdOrderByDayNumberAscOrderInDayAsc(Long planId);
}
