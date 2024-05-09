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

export type {
    Login,
    Register,
    Tokens
}