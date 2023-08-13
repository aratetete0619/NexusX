// test-utils.js
import { render } from '@testing-library/react';
import { AuthProvider } from './src/contexts/AuthContext';

const AllTheProviders = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
