import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o27ig107xb01xm9zh4cw46/master',
  cache: new InMemoryCache(),
})
