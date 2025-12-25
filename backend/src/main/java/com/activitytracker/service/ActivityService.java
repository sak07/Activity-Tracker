package com.activitytracker.service;

import com.activitytracker.dto.ActivityDTO;
import com.activitytracker.model.Activity;
import com.activitytracker.model.ActivityType;
import com.activitytracker.model.User;
import com.activitytracker.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserService userService;

    @Autowired
    public ActivityService(ActivityRepository activityRepository, UserService userService) {
        this.activityRepository = activityRepository;
        this.userService = userService;
    }

    @Transactional
    public ActivityDTO createActivity(ActivityDTO activityDTO) {
        User user = userService.getUserEntityById(activityDTO.getUserId());

        Activity activity = new Activity();
        activity.setUser(user);
        activity.setActivityType(activityDTO.getActivityType());
        activity.setDescription(activityDTO.getDescription());
        activity.setMetadata(activityDTO.getMetadata());

        Activity savedActivity = activityRepository.save(activity);
        return mapToDTO(savedActivity);
    }

    public Page<ActivityDTO> getAllActivities(Pageable pageable) {
        return activityRepository.findAll(pageable).map(this::mapToDTO);
    }

    public Page<ActivityDTO> getActivitiesByUserId(Long userId, Pageable pageable) {
        // Verify user exists
        userService.getUserById(userId);
        return activityRepository.findByUserId(userId, pageable).map(this::mapToDTO);
    }

    public Page<ActivityDTO> getActivitiesByType(ActivityType type, Pageable pageable) {
        return activityRepository.findByActivityType(type, pageable).map(this::mapToDTO);
    }

    public Page<ActivityDTO> getActivitiesByDateRange(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return activityRepository.findByTimestampBetween(start, end, pageable).map(this::mapToDTO);
    }

    private ActivityDTO mapToDTO(Activity activity) {
        return new ActivityDTO(
                activity.getId(),
                activity.getUser().getId(),
                activity.getUser().getUsername(),
                activity.getActivityType(),
                activity.getDescription(),
                activity.getMetadata(),
                activity.getTimestamp());
    }
}
