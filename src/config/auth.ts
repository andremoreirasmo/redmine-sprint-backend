interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default function AuthCofig(): IAuthConfig {
  return {
    jwt: {
      secret: process.env.SECRET_KEY ?? 'cbbf13a21e8dcc049f8e6496f7450866',
      expiresIn: '1d',
    },
  };
}
