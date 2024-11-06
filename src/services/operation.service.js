import axios from "axios";
import { environment } from "../environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class OperationService {
    async getAllOperations() {
        const token = sessionStorage.getItem('token');
        return await http.get(`/operationsAuth`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    async createOperation(data) {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error("Token no encontrado en sessionStorage");
            return;
        }
        return await http.post(`/create-operation`, data, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}
