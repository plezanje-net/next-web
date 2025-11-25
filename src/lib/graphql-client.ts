import { GraphQLClient, RequestDocument, Variables } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import getAuthToken from "./auth/auth-token";

export async function gqlRequest<TResult, TVariables extends Record<string, any> = Record<string, any>>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: RequestInit & { revalidate?: number; tags?: string[] }
): Promise<TResult> {
  const { revalidate, tags, ...rest } = options || {};
  
  const token = await getAuthToken();
  
  const customFetch = (url: string | URL | Request, init?: RequestInit) => {
    const initHeaders = init?.headers instanceof Headers 
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
    });
  };
  
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, { fetch: customFetch });
  return client.request<TResult>(query, variables || {});
}
