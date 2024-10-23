import axios from 'axios';

async function createImageAction(token: string, formData: FormData, progressCallback: (percentage: number) => void) {
  if (!token) return {};

  await axios.request({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_UPLOAD_URL}/image`,
    data: formData,
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
    onUploadProgress: (p) => {
      console.log("progress", p);
      if (p.progress !== undefined) {

        progressCallback(p.progress);
      }
    }
  }).then(data => {
    console.log(data);
    if (data.status === 200) {

    }

    return true;
  }).catch(function (error) {
    throw new Error('Creating image data failed.');
  });
}

export default createImageAction;
