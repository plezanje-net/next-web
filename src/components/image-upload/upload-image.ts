type TUploadImageArgs = {
  authToken: string;
  file: File;
  entityType: string;
  entityId: string;
  title: string;
  author: string;
  onProgress: (progress: number) => void;
};

function uploadImage({
  authToken,
  file,
  entityType,
  entityId,
  title,
  author,
  onProgress,
}: TUploadImageArgs) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("entityId", entityId);
    formData.append("entityType", entityType);
    formData.append("title", title);
    formData.append("author", author);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${process.env.NEXT_PUBLIC_UPLOAD_URL}/image`);

    xhr.setRequestHeader("Authorization", `Bearer ${authToken}`);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      onProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 201) {
        resolve(xhr.response);
      } else {
        reject(new Error(`"Image upload failed."`));
      }
    };

    xhr.onerror = () => reject(new Error("Image upload failed."));

    xhr.send(formData);
  });
}

export default uploadImage;
