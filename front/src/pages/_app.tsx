import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const csrClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + "/gql",
  cache: new InMemoryCache(),
});
export const ssrClient = new ApolloClient({
  uri: process.env.API_URL_SSR + "/gql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
