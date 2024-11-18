"use client";
import Button from "@/components/ui/button";
import Dialog, { DialogSize, DialogTitleSize } from "@/components/ui/dialog";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Checkbox from "../ui/checkbox";
import TextField from "../ui/text-field";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthStatus } from "@/utils/auth/auth-status";
import ProgressBar from "../ui/progress-bar";
import { bytesToSize } from "@/utils/file-size";
import IconClose from "../ui/icons/close";

type TImageUploadResponse = {
  aspectRatio: number;
  author: string;
  created: string;
  description: string | null;
  extension: string;
  id: string;
  legacy: string | null;
  maxIntrinsicWidth: number;
  path: string;
  title: string;
  updated: string;
  userId: string;
  __crag__: unknown;
  __has_crag__: boolean;
  __has_user__: boolean;
  __user__: unknown;
};

async function createImageAction(
  token: string,
  formData: FormData,
  progressCallback: (percentage: number) => void
) {
  return new Promise<TImageUploadResponse>(function (resolve, reject) {
    if (!token) reject({ status: 401, statusText: "Missing token" });

    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `${process.env.NEXT_PUBLIC_UPLOAD_URL}/image`, true);
      xhr.setRequestHeader("authorization", token ? `Bearer ${token}` : "");
      xhr.upload.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
          resolve(xhr.response as TImageUploadResponse);
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };

      xhr.upload.onprogress = (e) => {
        const percentComplete = e.loaded / e.total;
        progressCallback(percentComplete);
      };
      xhr.send(formData);
    } catch (error) {
      reject({ status: 500, statusText: error });
    }
  });
}

type TImageUploadProps = {
  openTrigger: ReactElement;
  entityType: string;
  entityId: string;
  user: AuthStatus;
};

type TFormErrors = {
  image: boolean;
  author: boolean;
  title: boolean;
};

export type TFormData = {
  image: File | null;
  author: string;
  title: string;
  entityType: string;
  entityId: string;
};

type TImageMetdata = {
  size: string;
  name: string;
};
const INITIAL_ERROR_STATE = {
  image: false,
  title: false,
  author: false,
};

const ERROR_MESSAGE = "Prišlo je do napake pri shranjevanju fotografije.";

function ImageUpload({
  openTrigger,
  entityType,
  entityId,
  user: authStatus,
}: TImageUploadProps) {
  const router = useRouter();
  const { user, token } = authStatus;
  const [logDialogIsOpen, setLogDialogIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [percentage, setPercentage] = useState<number>(0);
  const [authorCheckbox, setAuthorCheckbox] = useState(user ? true : false);
  const [formError, setFormError] = useState<TFormErrors>(INITIAL_ERROR_STATE);
  const imageInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const initialFormState = useMemo(() => {
    return {
      image: null,
      title: "",
      author: user !== undefined ? user.fullName : "",
      entityId: entityId,
      entityType: entityType,
    };
  }, [entityId, entityType, user]);

  const [formData, setFormData] = useState<TFormData>(initialFormState);
  const [pickedImage, setPickedImage] = useState<string>();
  const [pickedImageMetadata, setPickedImageMetadata] = useState<TImageMetdata>(
    {
      size: "",
      name: "",
    }
  );

  const handleImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (!file) {
        setPickedImage(undefined);
        return;
      }
      setFormData({ ...formData, image: file });
      setPickedImageMetadata({ size: bytesToSize(file.size), name: file.name });

      setFormError((prevState) => {
        return {
          ...prevState,
          image: false,
        };
      });
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          setPickedImage(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handlePickClick = () => {
    if (imageInput.current !== null) {
      imageInput.current.click();
    }
  };

  const resetForm = useCallback(() => {
    if (formRef.current !== null) {
      formRef.current.reset();
    }
    setPickedImage(undefined);
    setAuthorCheckbox(true);
    setFormData(initialFormState);
    setFormError(INITIAL_ERROR_STATE);
    setError("");
  }, [initialFormState]);

  const handleAuthorCheckboxClick = (value: boolean): void => {
    setAuthorCheckbox(value);
    if (user !== undefined) {
      setFormData({ ...formData, author: user?.fullName });
      setFormError((prevState) => {
        const newState = {
          ...prevState,
          author: false,
        };
        return newState;
      });
    }
  };

  const onFileUploadProgressChanged = (percentage: number) => {
    setPercentage(percentage);
  };

  useEffect(() => {
    if (isSubmitting) {
      setError("");
      const createImage = async (): Promise<void> => {
        try {
          const fd = new FormData();
          fd.append("author", formData.author);
          fd.append("title", formData.title);
          fd.append("image", formData.image as Blob);
          fd.append("entityId", formData.entityId);
          fd.append("entityType", formData.entityType);
          createImageAction(token ?? "", fd, onFileUploadProgressChanged)
            .then(() => {
              setLogDialogIsOpen(false);
              resetForm();
              router.refresh();
            })
            .catch(() => {
              setError(ERROR_MESSAGE);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        } catch (error) {
          setError(ERROR_MESSAGE);
          setIsSubmitting(false);
        }
      };

      const file: File | null = formData.image;
      const title: string = formData.title;
      const formAuthor: string = formData.author;

      if (
        file === null ||
        title.length == 0 ||
        (formAuthor !== null && formAuthor.length == 0)
      ) {
        setFormError((prevState) => {
          const newState = {
            ...prevState,
            image: file === null,
            title: title.length == 0,
            author: formAuthor !== null && formAuthor.length == 0,
          };
          return newState;
        });
        setIsSubmitting(false);
      } else {
        createImage();
      }
    }
  }, [
    formData.author,
    formData.entityId,
    formData.entityType,
    formData.image,
    formData.title,
    isSubmitting,
    resetForm,
    router,
    token,
  ]);

  const handleTitleChange = async (value: string) => {
    if (titleRef.current !== null) {
      setFormData({ ...formData, title: value });
      setFormError((prevState) => {
        const newState = {
          ...prevState,
          title: value.length === 0,
        };
        return newState;
      });
    }
  };

  const handleAuthorChange = (value: string) => {
    if (authorRef.current !== null) {
      setFormData({ ...formData, author: value });
      setFormError((prevState) => {
        const newState = {
          ...prevState,
          author: value.length === 0,
        };
        return newState;
      });
    }
  };

  const resetImagePreview = () => {
    setPickedImage(undefined);
    setFormData({ ...formData, image: null });
    if (imageInput.current !== null) {
      imageInput.current.value = "";
    }
  };

  function handleClose(): void {
    setIsSubmitting(true);
  }

  return (
    <Dialog
      title="Dodaj fotografijo"
      openTrigger={openTrigger}
      dialogSize={DialogSize.medium}
      titleSize={DialogTitleSize.regular}
      confirm={{
        label: "Objavi",
        callback: handleClose,
        disabled: isSubmitting,
        loading: false,
        dontCloseOnConfirm: true,
      }}
      cancel={{
        label: "Prekliči",
        callback: resetForm,
        disabled: isSubmitting,
      }}
      isOpen={logDialogIsOpen}
      closeCallback={resetForm}
      setIsOpen={setLogDialogIsOpen}
    >
      <form ref={formRef}>
        {pickedImage && (
          <div className="flex flex-row justify-between">
            <div className="min-w-14 h-14 relative mb-6 mt-2">
              <Image
                src={pickedImage}
                alt="Fotografija"
                fill
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="text-neutral-900 w-full pl-4 flex flex-col">
              <div className="flex justify-between">
                <div className="pt-1">
                  <span>
                    {pickedImageMetadata.name}
                    <br />
                  </span>
                  <span className="text-neutral-400">
                    {pickedImageMetadata.size}
                    <br />
                  </span>
                </div>
                <div>
                  <Button
                    disabled={isSubmitting}
                    variant="quaternary"
                    type="button"
                    onClick={resetImagePreview}
                  >
                    <IconClose />
                  </Button>
                </div>
              </div>
              {isSubmitting && (
                <div>
                  <ProgressBar value={percentage}></ProgressBar>
                </div>
              )}
            </div>
          </div>
        )}
        <input
          className="hidden"
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name="image"
          onChange={handleImageChanged}
          ref={imageInput}
        />
        {!pickedImage && (
          <Button type="button" onClick={handlePickClick}>
            Izberi datoteko
          </Button>
        )}
        {formError?.image && (
          <div
            className="mt-1 text-sm text-red-500"
            id="react-aria4183795666-:r7:"
          >
            Izberite fotografijo
          </div>
        )}
        <div className="mt-6 w-80">
          <TextField
            name="title"
            ref={titleRef}
            label="Naslov fotografije"
            isDisabled={isSubmitting}
            placeholder="npr. Pogled na steno"
            onChange={handleTitleChange}
            errorMessage={
              formError?.title ? "Vpišite naslov fotografije" : undefined
            }
          />
        </div>
        <div className="mt-6">
          <Checkbox
            disabled={isSubmitting}
            checked={authorCheckbox}
            onChange={handleAuthorCheckboxClick}
            label={
              user?.gender === "F"
                ? "Sem avtorica fotografije"
                : "Sem avtor fotografije"
            }
          />
        </div>
        <div className="mt-6 w-80">
          <TextField
            name="author"
            label="Avtor/ica fotografije"
            ref={authorRef}
            isDisabled={(authorCheckbox && user !== undefined) || isSubmitting}
            placeholder="Ime in priimek avtorice oz. avtorja"
            onChange={handleAuthorChange}
            value={formData.author}
            errorMessage={
              formError?.author
                ? "Vpišite avtorico oz. avtorja fotografije"
                : undefined
            }
          />
        </div>
        {error !== undefined && (
          <div
            className="mt-4 text-sm text-red-500"
            id="react-aria4183795666-:r7:"
          >
            {error}
          </div>
        )}
      </form>
    </Dialog>
  );
}

export default ImageUpload;
