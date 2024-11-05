import axios from "axios";
import { environment } from "../environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class OperationService {
    async getAllOperations() {
        const token = sessionStorage.getItem('token');
        return await http.get(`/all-operations`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
}