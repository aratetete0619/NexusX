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


export const CONFIRM_USER = gql`
  mutation ConfirmUser($confirmationCode: String!) {
    confirmUser(confirmationCode: $confirmationCode) {
      success
      message
    }
  }
`;


export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;



export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      original_query
      preprocessed_query
      search_results {
        neo4j_data {
          id
          labels
          properties
        }
        description
        score
      }
    }
  }
`;


export const GET_RELATED_NODES_QUERY = gql`
  query GetRelatedNodes($esId: String!) {
    getRelatedNodes(esId: $esId) {
      originalQuery
      preprocessedQuery
      startNode {
        identity
        labels
        properties {
          name
          esId
          imagePath
          description
        }
      }
      relationship {
        identity
        type
        properties {
          name
          esId
          imagePath
          description
        }
      }
      endNode {
        identity
        labels
        properties {
          name
          esId
          imagePath
          description
        }
      }
      score
    }
  }
`;


export const RESIZABLE_SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      originalQuery
      preprocessedQuery
      startNode {
        identity
        labels
        properties {
          name
          esId
          imagePath
          description
        }
      }
      score
    }
  }
`


export const AUTHENTICATE_WITH_GOOGLE = gql`
  mutation AuthenticateWithGoogle($tokenId: String!) {
    authenticateWithGoogle(tokenId: $tokenId) {
      id
      email
      token
      message
    }
  }
`;
