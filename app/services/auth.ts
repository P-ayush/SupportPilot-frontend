import api from "../utils/axios";

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
}

export const signUp = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
}