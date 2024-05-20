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
    userEmail: string,
    userRole: string,
    userId: string,
    exp: number
}

export type {
    Login,
    Register,
    Tokens,
    DecodedToken
}