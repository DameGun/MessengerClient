import { Login, Register, Tokens } from "@customTypes/authentication";
import { apiSlice } from "@state/api";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<Tokens, Login>({
            query: credentials => ({
                url: '/authentication/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation<Tokens, Register>({
            query: credentials => ({
                url: '/authentication',
                method: 'POST',
                body: {...credentials}
            })
        }),
        tokensRefresh: builder.mutation<Tokens, string>({
            query: refreshToken => ({
                url: '/token/refresh',
                method: 'POST',
                headers: {
                    'Refresh-Token': refreshToken
                }
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useTokensRefreshMutation
} = authApiSlice