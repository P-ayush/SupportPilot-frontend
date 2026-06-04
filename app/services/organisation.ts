import api from "../utils/axios";

export const createOrganisation = async (name: string) => {
    const response = await api.post('/organisation/create', { name });
    return response.data;
}

export const listOrganisation = async () => {
    const response = await api.get(`/organisation/list`);
    return response.data;
}