export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  scope: string;
  exp: number;
  iat: number;
  iss: string;
}
