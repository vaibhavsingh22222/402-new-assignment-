import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Review } from "../types/reviews"

export type ReviewService = {
    getAll: () => Promise<Review[]>;
    get: (id: string) => Promise<Review>;
    put: (review: Review) => Promise<Review>;
    delete: (id: string) => Promise<void>;
}

const DEFAULT_BASE_URL = "https://1vdpwnec1h.execute-api.us-east-1.amazonaws.com";

const createReviewService = (baseURL: string = DEFAULT_BASE_URL): ReviewService => {
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

    const getAll = async (): Promise<Review[]> => {
        const response = await client.get('/reviews', await getAuthConfig());
        return response.data;
    };

    const get = async (id: string): Promise<Review> => {
        const response = await client.get(`/reviews/${id}`, await getAuthConfig());
        return response.data;
    };

    const put = async (review: Review): Promise<Review> => {
        const response = await client.put('/reviews', review, await getAuthConfig());
        return response.data;
    };

    const remove = async (id: string): Promise<void> => {
        await client.delete(`/reviews/${id}`, await getAuthConfig());
    };

    return { getAll, get, put, delete: remove };
};

export default createReviewService();