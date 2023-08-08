import { GraphQLClient } from 'graphql-request';

if (!process.env.NEXT_PUBLIC_GRAPHQL_API_URL)
  throw new Error('Required NEXT_PUBLIC_GRAPHQL_API_URL missing in env');

export const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/graphql`,
);
