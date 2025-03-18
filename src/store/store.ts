import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import axios from "axios";
export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const data = await AuthService.login(email, password);
            console.log(data);
            localStorage.setItem('token', data.accessToken);
            console.log('ItemSet')
            this.setAuth(true);
            this.setUser(data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const data = await AuthService.registration(email, password);
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setUser(data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true}); 
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user)
            this.setAuth(true);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }
}