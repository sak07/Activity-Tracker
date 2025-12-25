package com.activitytracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Activity entity representing a specific action performed by a user.
 * Stores details about what happened, when, and any associated metadata.
 */
@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore // Prevent infinite recursion in JSON serialization
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false)
    @NotNull(message = "Activity type is required")
    private ActivityType activityType;

    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Flexible field to store additional data in JSON format.
     * In a production Postgres environment, this could be a JSONB column.
     * For H2/Simple setup, we'll treat it as a text string containing JSON.
     */
    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    public Activity() {
    }

    public Activity(Long id, User user, ActivityType activityType, String description, String metadata,
            LocalDateTime timestamp) {
        this.id = id;
        this.user = user;
        this.activityType = activityType;
        this.description = description;
        this.metadata = metadata;
        this.timestamp = timestamp;
    }

    /**
     * Constructor for creating a new activity
     */
    public Activity(User user, ActivityType activityType, String description, String metadata) {
        this.user = user;
        this.activityType = activityType;
        this.description = description;
        this.metadata = metadata;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
