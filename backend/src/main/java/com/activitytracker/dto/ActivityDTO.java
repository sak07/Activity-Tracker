package com.activitytracker.dto;

import com.activitytracker.model.ActivityType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ActivityDTO {

    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    private String username; // Included for convenience in list views

    @NotNull(message = "Activity type is required")
    private ActivityType activityType;

    private String description;

    private String metadata;

    private LocalDateTime timestamp;

    public ActivityDTO() {
    }

    public ActivityDTO(Long id, Long userId, String username, ActivityType activityType, String description,
            String metadata, LocalDateTime timestamp) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.activityType = activityType;
        this.description = description;
        this.metadata = metadata;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
