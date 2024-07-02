import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const retryLink = new RetryLink({
  delay: {
    initial: 2000,
    max: 2000,
    jitter: false,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  link: from([retryLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
