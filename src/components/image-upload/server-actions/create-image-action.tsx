"use server";
import getAuthToken from "@/utils/auth/auth-token";

async function createImageAction(formData: FormData) {

  const token = getAuthToken();

  if (!token) return {};
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_UPLOAD_URL}/image`,
    {
      method: 'POST',
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Creating image data failed.');
  }

  return true;
}

export default createImageAction;
