// src/services/user.service.js
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:9000/api/v1'
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
}