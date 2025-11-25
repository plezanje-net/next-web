"use server";

import { cookies } from "next/headers";

async function logoutAction() {
  (await cookies()).delete("token");
}

export default logoutAction;
