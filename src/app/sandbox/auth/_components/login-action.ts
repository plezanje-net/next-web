"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { LoginDocument } from "@/graphql/generated";
import { cookies } from "next/headers";

interface FormData {
  email: string;
  password: string;
}

async function loginAction(formData: FormData) {
  try {
    const result = await gqlRequest(LoginDocument, formData);
    (await cookies()).set("token", result.login.token);
    return { success: true, data: result.login };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Prijava ni uspela." };
  }
}

export default loginAction;
