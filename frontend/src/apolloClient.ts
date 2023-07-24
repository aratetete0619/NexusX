// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace this with the URI of your GraphQL API
  cache: new InMemoryCache()
});

export default client;
