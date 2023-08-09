import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { AuthContext } from '../contexts/AuthContext';
import { ErrorContext } from '../contexts/ErrorContext';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

jest.mock('next/router');
jest.mock('@apollo/client');
jest.mock('nookies');
jest.mock('react-google-recaptcha', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Mock ReCAPTCHA</div>;
    },
  };
});
jest.mock('@react-oauth/google', () => {
  return {
    GoogleLogin: () => {
      return <div>Mock GoogleLogin</div>;
    },
  };
});

const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockSetCookie = setCookie as jest.MockedFunction<typeof setCookie>;

const mockRouter = { push: jest.fn() };
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('LoginForm', () => {
  const mockShowError = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockUseMutation.mockReturnValue([
      jest.fn().mockResolvedValue({
        data: { loginUser: { token: 'testToken' } },
      }),
      {},
    ]);
    render(
      <ErrorContext.Provider value={{ showError: mockShowError }}>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <LoginForm />
        </AuthContext.Provider>
      </ErrorContext.Provider>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('validates form on submit', async () => {
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);
    expect(mockShowError).toHaveBeenCalledWith('Please enter a valid email address');

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(loginButton);
    expect(mockLogin).toHaveBeenCalled();
    expect(mockSetCookie).toHaveBeenCalledWith(
      null,
      'token',
      'testToken',
      expect.objectContaining({
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/explore');
  });
});
