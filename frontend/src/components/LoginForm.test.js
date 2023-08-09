// // LoginForm.test.js
// import { render, fireEvent, waitFor } from '../../test-utils';
// import LoginForm from '../components/LoginForm';
// import { MockedProvider } from '@apollo/client/testing';
// import { LOGIN_USER } from '../components/LoginForm';  // Assuming this is where your LOGIN_USER mutation is exported from

// describe('LoginForm', () => {
//   const loginMutationSuccess = {
//     request: {
//       query: LOGIN_USER,
//       variables: {
//         email: 'test@example.com',
//         password: 'password',
//       },
//     },
//     result: {
//       data: {
//         loginUser: {
//           id: '1',
//           email: 'test@example.com',
//           token: 'dummy_token',
//         },
//       },
//     },
//   };

//   const loginMutationError = {
//     request: {
//       query: LOGIN_USER,
//       variables: {
//         email: 'wrong@example.com',
//         password: 'password',
//       },
//     },
//     error: new Error('Invalid credentials'),
//   };

//   it('logs in successfully', async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <MockedProvider mocks={[loginMutationSuccess]} addTypename={false}>
//         <LoginForm />
//       </MockedProvider>
//     );

//     fireEvent.change(getByPlaceholderText('Email'), {
//       target: { value: 'test@example.com' },
//     });
//     fireEvent.change(getByPlaceholderText('Password'), {
//       target: { value: 'password' },
//     });

//     fireEvent.click(getByText('Log in'));

//     // Replace the following line with the actual action that happens after a successful login
//     await waitFor(() => getByText('Logged in successfully'));
//   });

//   it('shows an error message on failed login', async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <MockedProvider mocks={[loginMutationError]} addTypename={false}>
//         <LoginForm />
//       </MockedProvider>
//     );

//     fireEvent.change(getByPlaceholderText('Email'), {
//       target: { value: 'wrong@example.com' },
//     });
//     fireEvent.change(getByPlaceholderText('Password'), {
//       target: { value: 'password' },
//     });

//     fireEvent.click(getByText('Log in'));

//     await waitFor(() => getByText('Invalid credentials'));
//   });
// });
