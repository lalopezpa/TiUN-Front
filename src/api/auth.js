import axios from 'axios';
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	withCredentials: true,
});

const API = 'http://localhost:3000/';

export const registerRequest = user => axiosInstance.post(`${API}signup`, user);

export const loginRequest = user => axiosInstance.post(`${API}signin`, user);

export const verifyToken  => axiosInstance.get(`${API}accesToken`);

// export const verifyTokenRequest = async () => axiosInstance.get(`/auth/verify`);
