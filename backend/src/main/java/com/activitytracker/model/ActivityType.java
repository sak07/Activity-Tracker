package com.activitytracker.model;

/**
 * Enum representing different types of activities that can be tracked.
 * This provides type safety and makes it easy to extend with new activity
 * types.
 */
public enum ActivityType {
    LOGIN("User logged in"),
    LOGOUT("User logged out"),
    VIEW_PAGE("User viewed a page"),
    CLICK_BUTTON("User clicked a button"),
    FORM_SUBMIT("User submitted a form"),
    PURCHASE("User made a purchase"),
    DOWNLOAD("User downloaded a file"),
    UPLOAD("User uploaded a file"),
    SEARCH("User performed a search"),
    CREATE("User created a resource"),
    UPDATE("User updated a resource"),
    DELETE("User deleted a resource"),
    SHARE("User shared content"),
    COMMENT("User posted a comment"),
    LIKE("User liked content"),
    OTHER("Other activity");

    private final String description;

    ActivityType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
