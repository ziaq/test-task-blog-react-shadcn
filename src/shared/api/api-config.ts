type TokenGetter = () => string | null;
type RefreshTokenFn = () => Promise<void>;

let getToken: TokenGetter | undefined;
let refreshToken: RefreshTokenFn | undefined;

export function configureApi(options: {
  getAccessToken: TokenGetter;
  refreshToken: RefreshTokenFn;
}) {
  getToken = options.getAccessToken;
  refreshToken = options.refreshToken;
}

export function getAccessToken() {
  if (!getToken) {
    throw new Error('getToken not configured. Did you forget to call configureApi()?');
  }
  return getToken();
}

export async function runRefreshToken() {
  if (!refreshToken) {
    throw new Error('refreshToken not configured. Did you forget to call configureApi()?');
  }
  await refreshToken();
}
