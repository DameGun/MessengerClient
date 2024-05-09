import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@state/store';
import { logout, setCredentials } from '@services/redux/auth/authSlice';

const API_VERSION = import.meta.env.VITE_API_VERSION;
const API_URL = import.meta.env.VITE_API_URL_DEV;

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/api/v${API_VERSION}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error && 'originalStatus' in result.error) {
        if (result.error.originalStatus === 403) {
            console.log('sending refresh token')
            // send refresh token to get new access token
            const refreshResult = await baseQuery('/token/refresh', api, extraOptions);
            console.log(refreshResult);

            if (refreshResult?.data) {
                // store the new token
                api.dispatch(setCredentials({ ...refreshResult.data }))
                // retry the original query with new access token
                result = await baseQuery(args, api, extraOptions);
            }
            else {
                api.dispatch(logout())
            }
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({})
})