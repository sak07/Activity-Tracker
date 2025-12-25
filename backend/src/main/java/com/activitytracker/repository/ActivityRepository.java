package com.activitytracker.repository;

import com.activitytracker.model.Activity;
import com.activitytracker.model.ActivityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    // Find activities by user ID with pagination
    Page<Activity> findByUserId(Long userId, Pageable pageable);

    // Find activities by type
    Page<Activity> findByActivityType(ActivityType activityType, Pageable pageable);

    // Find activities by user and type
    Page<Activity> findByUserIdAndActivityType(Long userId, ActivityType activityType, Pageable pageable);

    // Find activities within a date range
    Page<Activity> findByTimestampBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    // Find activities by user within a date range
    Page<Activity> findByUserIdAndTimestampBetween(Long userId, LocalDateTime start, LocalDateTime end,
            Pageable pageable);
}
