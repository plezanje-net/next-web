import { GraphQLClient } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import getAuthToken from "./auth/auth-token";

export class GqlError extends Error {
  networkError?: Error;
  graphQLErrors?: any[];

  constructor(options: { networkError?: Error; graphQLErrors?: any[] }) {
    super(options.networkError?.message || "GraphQL request failed");
    this.name = "GqlError";
    this.networkError = options.networkError;
    this.graphQLErrors = options.graphQLErrors;
  }
}

type GqlRequestResult<TResult> = { data: TResult; error?: GqlError };

export async function gqlRequest<
  TResult,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: RequestInit & { revalidate?: number; tags?: string[] }
): Promise<GqlRequestResult<TResult>> {
  const { revalidate, tags, ...rest } = options || {};

  const token = await getAuthToken();

  const customFetch = (url: string | URL | Request, init?: RequestInit) => {
    const initHeaders =
      init?.headers instanceof Headers
        ? Object.fromEntries(init.headers.entries())
        : init?.headers || {};

    return fetch(url, {
      ...init,
      ...rest,
      headers: {
        ...initHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate, tags },
      ...(tags ? { cache: 'force-cache' } : {}),
    });
  };

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, {
    fetch: customFetch,
  });

  try {
    const data = await client.request<TResult>(query, variables || {});
    return { data };
  } catch (error) {
    const gqlError =
      error instanceof GqlError
        ? error
        : new GqlError({
            networkError:
              error instanceof Error ? error : new Error(String(error)),
          });
    return { data: {} as TResult, error: gqlError };
  }
}
