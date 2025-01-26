"use server";

import { cookies } from "next/headers";

async function logoutAction() {
  cookies().delete("token");
}

export default logoutAction;
