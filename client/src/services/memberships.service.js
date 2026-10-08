import { api } from './api'

export const membershipsService = {
    list: async (params) => (await api.get('/memberships', { params })).data.data,
    create: async (payload) => (await api.post('/memberships', payload)).data.data,
    cancel: async (id) => (await api.patch(`/memberships/${id}/cancel`)).data.data,
}