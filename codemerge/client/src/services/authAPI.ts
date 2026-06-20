import api from "../lib/api";
import type {RegisterData , LoginData , User} from "../types/auth.types"

export interface AuthResponse {
   success: boolean,
   message: string,
   user : User
}

export const registerUser = (data : RegisterData) => {
   return api.post<AuthResponse>("/auth/register", data);
};

export const loginUser = (data : LoginData) => {
   return api.post<AuthResponse>("/auth/login", data);
};

export const logoutUser = () => {
   return api.post("/auth/logout");
};