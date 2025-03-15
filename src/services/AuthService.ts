import $api from "../http";
import {  } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', {email, password})
    }
}