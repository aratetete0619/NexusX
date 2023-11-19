import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

interface AuthenticatedLinkProps {
  to: string;
  children: React.ReactNode;
}

const AuthenticatedLink: React.FC<AuthenticatedLinkProps> = ({ to, children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push(to);
    }
  };

  return <a href={to} onClick={handleClick}>{children}</a>;
};

export default AuthenticatedLink;
