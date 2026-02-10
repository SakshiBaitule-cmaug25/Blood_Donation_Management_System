import axios from 'axios';
import { API_BASE_URL } from '../constants/APIConstents';
export function donateBlood(formData){
    return axios.post(`${API_BASE_URL}/addDonor`, formData);
}