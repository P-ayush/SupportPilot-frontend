import api from "../utils/axios";

export const listDocuments = async (organisationId: number) => {
    const response = await api.get(`/document/list/${organisationId}`);
    return response.data;
}

export const deleteDocument = async (organisationId: number, documentId: number) => {
    const response = await api.delete(`/document/delete/${organisationId}/${documentId}`,);
    return response.data;
}

export const uploadDocument = async (organisationId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/document/upload/${organisationId}`, formData);
    return response.data;
}