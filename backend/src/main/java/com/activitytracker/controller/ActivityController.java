package com.activitytracker.controller;

import com.activitytracker.dto.ActivityDTO;
import com.activitytracker.model.ActivityType;
import com.activitytracker.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<ActivityDTO> createActivity(@Valid @RequestBody ActivityDTO activityDTO) {
        ActivityDTO createdActivity = activityService.createActivity(activityDTO);
        return new ResponseEntity<>(createdActivity, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ActivityDTO>> getAllActivities(
            @PageableDefault(sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ActivityDTO> activities = activityService.getAllActivities(pageable);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ActivityDTO>> getActivitiesByUserId(
            @PathVariable Long userId,
            @PageableDefault(sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ActivityDTO> activities = activityService.getActivitiesByUserId(userId, pageable);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<Page<ActivityDTO>> getActivitiesByType(
            @PathVariable ActivityType type,
            @PageableDefault(sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ActivityDTO> activities = activityService.getActivitiesByType(type, pageable);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/range")
    public ResponseEntity<Page<ActivityDTO>> getActivitiesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @PageableDefault(sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ActivityDTO> activities = activityService.getActivitiesByDateRange(start, end, pageable);
        return ResponseEntity.ok(activities);
    }
}
