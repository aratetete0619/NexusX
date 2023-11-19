import jwt from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const authenticateUser = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const token = cookies.token;
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (typeof jwtSecret == 'string') {
    try {
      jwt.verify(token, jwtSecret);
    } catch (error) {
      context.res.setHeader('location', '/login');
      context.res.statusCode = 302;
      context.res.end();
      return { authenticated: false, token: null };
    }
  }

  return { authenticated: true, token };
};
