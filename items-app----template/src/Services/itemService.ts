import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Item } from "../types/item"
export type ItemService = {
 getAll: () => Promise<Item[]>;
 get: (id: string) => Promise<Item>;
 put: (item: Item) => Promise<Item>;
 delete: (id: string) => Promise<void>;
}
const DEFAULT_BASE_URL = "https://1vdpwnec1h.execute-api.us-east-1.amazonaws.com";
const createItemService = (baseURL: string = DEFAULT_BASE_URL): ItemService => {
 const client = axios.create({ baseURL });
 const getAuthConfig = async () => {
 const session = await fetchAuthSession();
 const idToken = session.tokens?.idToken?.toString();
 if (!idToken) {
 throw new Error('No IdToken available for authorization');
 }
 return {
 headers: { Authorization: idToken },
 };
 };
 const getAll = async (): Promise<Item[]> => {
 const response = await client.get('/items', await getAuthConfig());
 return response.data;
 };
 const get = async (id: string): Promise<Item> => {
 const response = await client.get(`/items/${id}`, await getAuthConfig());
 return response.data;
 };
 const put = async (item: Item): Promise<Item> => {
 const response = await client.put('/items', item, await getAuthConfig());
 return response.data;
 };
 const remove = async (id: string): Promise<void> => {
 await client.delete(`/items/${id}`, await getAuthConfig());
 };
 return { getAll, get, put, delete: remove };
};
export default createItemService();