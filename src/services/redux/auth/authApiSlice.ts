import { Login, Register, Tokens } from "@customTypes/authentication";
import { apiSlice } from "@services/api";

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
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApiSlice