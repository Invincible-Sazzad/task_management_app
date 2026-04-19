import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT;

function getToken() {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
}

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
    fetch: (uri, options) => {
      const token = getToken();

      return fetch(uri, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      });
    },
  }),
  cache: new InMemoryCache(),
});