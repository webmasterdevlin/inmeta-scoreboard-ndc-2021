import { api } from "./api-config";

export async function getAxios<T>(endpoint: string) {
  return await api.get<Array<T>>(endpoint);
}

export async function getByIdAxios<T>(endpoint: string, id: string) {
  return await api.get<T>(endpoint + "/" + id);
}

export async function deleteAxios(endpoint: string, id: string) {
  return await api.delete<void>(`${endpoint}/${id}`);
}

export async function postAxios<T>(endpoint: string, arg: T) {
  return await api.post<T>(`${endpoint}`, arg);
}

export async function putAxios<T>(endpoint: string, id: string, arg: T) {
  return await api.put<T>(`${endpoint}/${id}`, arg);
}
