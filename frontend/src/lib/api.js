import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const submitContact = (data) => api.post('/contact/', data)
export const submitConsultation = (data) => api.post('/consultation/', data)
export const submitHealthCheckup = (data) => api.post('/health-checkup/', data)
export const submitLeadMagnet = (data) => api.post('/lead-magnet/', data)

export const getJobs = (params = {}) => api.get('/careers/jobs/', { params })
export const getJobBySlug = (slug) => api.get(`/careers/jobs/${slug}/`)
export const submitApplication = (formData) =>
  api.post('/careers/applications/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
