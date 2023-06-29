"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function logoutAction() {
  cookies().delete("token");
}

export default logoutAction;
