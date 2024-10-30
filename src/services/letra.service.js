import axios from "axios";
import {environment} from "../environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class LetraService {

    async getLetra() {
        return await http.get('/home');
    }

}