/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

const API = 'http://localhost:3000/';

export const registerRequest = user => axios.post(`${API}register`, user);

export const loginRequest = user => axios.post(`${API}signin`, user);