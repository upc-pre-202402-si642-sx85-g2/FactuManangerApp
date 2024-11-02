import axios from "axios";
import { environment } from "../environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class LetraService {
    async getCarteraByUserId(userId) {
        const token = sessionStorage.getItem('token');
        return await http.get(`/cartera/${userId}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    async getLetrasByCarteraId(carteraId) {
        const token = sessionStorage.getItem('token');
        return await http.get(`/letras/${carteraId}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}