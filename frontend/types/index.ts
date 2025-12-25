export enum ActivityType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  VIEW_PAGE = "VIEW_PAGE",
  CLICK_BUTTON = "CLICK_BUTTON",
  FORM_SUBMIT = "FORM_SUBMIT",
  PURCHASE = "PURCHASE",
  DOWNLOAD = "DOWNLOAD",
  UPLOAD = "UPLOAD",
  SEARCH = "SEARCH",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SHARE = "SHARE",
  COMMENT = "COMMENT",
  LIKE = "LIKE",
  OTHER = "OTHER"
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface UserDTO {
  username: string;
  email: string;
  fullName?: string;
}

export interface Activity {
  id: number;
  userId: number;
  username?: string;
  activityType: ActivityType;
  description?: string;
  metadata?: string;
  timestamp: string;
}

export interface ActivityDTO {
  userId: number;
  activityType: ActivityType;
  description?: string;
  metadata?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
