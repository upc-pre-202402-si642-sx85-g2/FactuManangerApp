// src/services/user.service.js
import axios from 'axios';
import { environment } from '../environment/environment.js';

const http = axios.create({
    baseURL: environment.baseUrl
});

export class UserService {
    async createUser(user) {
        const response = await http.post('/create-account', user);
        return response.data;
    }

    async signIn(email, password) {
        const response = await http.post('/sign-in', { email, password });
        return response.data;
    }

    async recoveryPassword(email) {
        const response = await http.post('/recovery-password-reset', { email });
        return response.data;
    }

    async resetPassword(token, newPassword) {
        const response = await http.post('/reset-password', { token, newPassword });
        return response.data;
    }
}