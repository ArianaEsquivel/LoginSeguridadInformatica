export interface TokenResp {
  token: TokenR;
}
export interface TokenR {
  type:         string;
  token:        string;
  refreshToken: null;
}
