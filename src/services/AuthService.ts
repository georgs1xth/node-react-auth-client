import $api from "../http";
// import { } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>('/login', {email, password})
            .then(response => response.data)
    }

    static async registration(email: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>('/registration', {email, password})
            .then(response => response.data)
    }

    static async logout(): Promise<void> {
        await $api.post('/logout');
        return;
    }
}
