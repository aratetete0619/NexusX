import { gql } from '@apollo/client';

export const ADD_FAVORITE = gql`
  mutation AddFavorite($email: String!, $nodeId: String!) {
    addFavorite(email: $email, nodeId: $nodeId) {
      email
      nodeId
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($email: String!, $nodeId: String!) {
    removeFavorite(email: $email, nodeId: $nodeId) {
      email
      nodeId
    }
  }
`;


export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
      message
      confirmationUrl
    }
  }
`;
