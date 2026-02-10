import axios from 'axios';
import { API_BASE_URL } from '../constants/APIConstents';

// 🧍‍♂️ User APIs
export function login(formData) {
  return axios.post(`${API_BASE_URL}/login`, formData);
}

export function register(formData) {
  return axios.post(`${API_BASE_URL}/user`, formData);
}

// 🩸 Blood Availability
export function getAvailableByType(btype) {
  return axios.get(`${API_BASE_URL}/getavai/${btype}`);
}

// 📊 Dashboard Data
export function getDashboardData() {
  return axios.get(`${API_BASE_URL}/dashboard`);
}

// 🧾 Receive Blood
export function receiveBlood(data) {
  return axios.post(`${API_BASE_URL}/receive`, data);
}

// 🏥 Blood Bank CRUD APIs (✅ Corrected Routes)
export function getBloodBanks() {
  return axios.get(`${API_BASE_URL}/banks`);
}

export function addBloodBank(data) {
  return axios.post(`${API_BASE_URL}/addBank`, data);
}

export function updateBloodBank(id, data) {
  return axios.put(`${API_BASE_URL}/updateBank/${id}`, data);
}

export function deleteBloodBank(id) {
  return axios.delete(`${API_BASE_URL}/deleteBank/${id}`);
}


export function getReceiverData() {
  return axios.get(`${API_BASE_URL}/getData`);
}

