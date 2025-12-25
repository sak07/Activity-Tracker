import api from '../lib/api';
import { User, UserDTO, Activity, ActivityDTO, Page, ActivityType } from '../types';

export const userService = {
    getAll: async () => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    create: async (user: UserDTO) => {
        const response = await api.post<User>('/users', user);
        return response.data;
    }
};

export const activityService = {
    getAll: async (page = 0, size = 10) => {
        const response = await api.get<Page<Activity>>('/activities', {
            params: { page, size, sort: 'timestamp,desc' }
        });
        return response.data;
    },

    getByUser: async (userId: number, page = 0, size = 10) => {
        const response = await api.get<Page<Activity>>(`/activities/user/${userId}`, {
            params: { page, size, sort: 'timestamp,desc' }
        });
        return response.data;
    },

    getByType: async (type: ActivityType, page = 0, size = 10) => {
        const response = await api.get<Page<Activity>>(`/activities/type/${type}`, {
            params: { page, size, sort: 'timestamp,desc' }
        });
        return response.data;
    },

    create: async (activity: ActivityDTO) => {
        const response = await api.post<Activity>('/activities', activity);
        return response.data;
    }
};
