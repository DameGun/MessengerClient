interface Login {
  email: string;
  password: string;
}

type Register = Login;

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken {
  userEmail: string;
  userRole: string;
  userId: string;
  exp: number;
}

export type { Login, Register, Tokens, DecodedToken };
