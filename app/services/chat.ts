import api from "../utils/axios";

export const chatHistory = async (organisationId: number) => {
    const response = await api.get(`/chat/history/${organisationId}`);
    return response.data;
}
export const createChat = async (organisationId: number, question: string) => {
    const response = await api.post(`/chat/create/${organisationId}`, { question });
    return response.data;
}