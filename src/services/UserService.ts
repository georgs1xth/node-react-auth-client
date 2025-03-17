import $api from "../http";
import { IUser } from "../models/IUser";

export default class UserService {
    static async fetchUsers(): Promise<IUser[]> {
        return $api.get<IUser[]>('/users')
            .then(response => response.data)
    }
}
