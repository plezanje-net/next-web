import { cookies } from "next/headers";

function getAuthToken(): string | null {
  return cookies().get("token")?.value ?? null;
}

export default getAuthToken;
