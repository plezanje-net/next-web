"use client";

import { ChangeEventHandler, FormEvent, useRef, useState } from "react";
import Button from "../ui/button";
import Image from "next/image";
import uploadImage from "./upload-image";
import TextField from "../ui/text-field";
import Checkbox from "../ui/checkbox";
import IconClose from "../ui/icons/close";
import { useAuthContext } from "@/lib/auth/auth-context";
import ProgressBar from "../ui/progress-bar";
import formatFileSize from "@/lib/format-file-size";

type TImageUploadFormProps = {
  authToken: string;
  entityType: string;
  entityId: string;
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onUploadSuccess: () => void;
};

function ImageUploadForm({
  authToken,
  entityType,
  entityId,
  loading,
  onLoadingChange,
  onUploadSuccess,
}: TImageUploadFormProps) {
  const { currentUser } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState("");
  const [userIsAuthor, setUserIsAuthor] = useState(true);
  const [author, setAuthor] = useState(currentUser?.fullName || "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [fileError, setFileError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const previewUrl = file ? URL.createObjectURL(file) : null;

  const userIsAuthorLabel = `Sem avtor${currentUser?.gender === "F" ? "ica" : currentUser?.gender === "M" ? "" : "/ica"} fotografije`;
  const authorLabel = `${userIsAuthor ? `Avtor${currentUser?.gender === "F" ? "ica" : currentUser?.gender === "M" ? "" : "/ica"}` : "Avtor/ica"} fotografije`;

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files?.[0]);
    setFileError("");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setTitleError("");
  };

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
    setAuthorError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("image") as HTMLInputElement;
    const file = fileInput.files?.[0];

    // validate form
    if (!file) {
      setFileError("Izbrati moraš datoteko s fotografijo.");
    }

    if (!title) {
      setTitleError("Naslov fotografije je obvezen podatek.");
    }

    if (!author) {
      setAuthorError("Avtor fotografije je obvezen podatek.");
    }

    if (!file || !title || !author) {
      return;
    }

    onLoadingChange(true);

    try {
      await uploadImage({
        file,
        authToken,
        entityType,
        entityId,
        title,
        author,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      onUploadSuccess();
    } catch (error) {
      setGeneralError("Prišlo je do napake pri shranjevanju fotografije.");
    } finally {
      onLoadingChange(false);
    }
  };

  const handleUserIsAuthorChange = (checked: boolean) => {
    if (checked) {
      setAuthor(currentUser?.fullName || "");
    } else {
      setAuthor("");
    }
    setUserIsAuthor(checked);
  };

  const handleClearFile = () => {
    setFile(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <form id="image-upload-form" onSubmit={handleSubmit}>
        {file && previewUrl ? (
          <div className="flex">
            <div className="relative w-13 h-17">
              <Image
                src={previewUrl}
                alt="Preview"
                className="rounded-lg object-cover"
                fill
              />
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="truncate">{file.name}</div>
                <Button
                  type="button"
                  variant="quaternary"
                  onClick={handleClearFile}
                  className="shrink-0 -my-1 -mr-1"
                >
                  <IconClose />
                </Button>
              </div>
              <div className="text-neutral-400 text-sm">
                {formatFileSize(file.size)}
              </div>
              {uploadProgress !== null && (
                <div className="mt-1">
                  <ProgressBar progress={uploadProgress} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* styled button to trigger file input */}
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Izberi datoteko
            </Button>
            <div className="text-sm mt-1 text-red-500">{fileError}</div>
          </>
        )}
        {/* the actual file input is hidden */}
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col mt-6 gap-6">
          <TextField
            label="Naslov fotografije"
            value={title}
            onChange={handleTitleChange}
            placeholder="npr. Pogled na steno"
            disabled={loading}
            errorMessage={titleError}
          />

          <Checkbox
            label={userIsAuthorLabel}
            onChange={handleUserIsAuthorChange}
            checked={userIsAuthor}
            disabled={loading}
          />

          <TextField
            label={authorLabel}
            value={author}
            onChange={handleAuthorChange}
            disabled={userIsAuthor || loading}
            errorMessage={authorError}
          />
          {generalError && (
            <div className="text-sm text-red-500">{generalError}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ImageUploadForm;
