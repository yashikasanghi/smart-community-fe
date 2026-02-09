import { getAccessToken } from "@/utils/tokenStorage";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { setAppError } from "@/store/appErrorStore";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/smart-community/manage-issues",
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    (async () => {
      try {
        const token = await getAccessToken();

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        }));

        const sub = forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => sub.unsubscribe();
      } catch (err) {
        observer.error(err);
      }
    })();
  });
});

const errorLink = new ApolloLink((operation, forward) => {
  if (!forward) {
    return new Observable((observer) => {
      observer.complete();
    });
  }
  return new Observable((observer) => {
    const sub = forward(operation).subscribe({
      next: (result) => {
        if (result?.errors?.length) {
          setAppError({
            message: result.errors[0]?.message || "Unexpected error",
            source: "graphql",
          });
        }
        observer.next(result);
      },
      error: (networkError) => {
        setAppError({
          message: "Service is unavailable. Please try again.",
          source: "network",
        });
        observer.error(networkError);
      },
      complete: () => observer.complete(),
    });
    return () => sub.unsubscribe();
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
