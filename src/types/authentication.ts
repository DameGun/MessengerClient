type Login = {
    email: string,
    password: string
}

type Register = {
    email: string,
    password: string
}

type Tokens = {
    accessToken: string,
    refreshToken: string
}

type DecodedToken = {
    email: string,
    role: string,
    user_id: string,
    exp: number
}

export type {
    Login,
    Register,
    Tokens,
    DecodedToken
}