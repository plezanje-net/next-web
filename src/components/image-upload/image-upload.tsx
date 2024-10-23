"use client"
import Button from "@/components/ui/button";
import Dialog, { DialogSize, DialogTitleSize } from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, ReactElement, useRef, useState } from "react";
import Checkbox from "../ui/checkbox";
import TextField from "../ui/text-field";
import createImageAction from "./server-actions/create-image-action";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { AuthStatus } from "@/utils/auth/auth-status";
import ProgressBar from "../ui/progress-bar";
import { IconSize } from "../ui/icons/icon-size";
import { bytesToSize } from "@/utils/file-size";
import IconClose from "../ui/icons/close";

type TImageUploadProps = {
  openTrigger: ReactElement;
  entityType: string;
  entityId: string;
  user: AuthStatus
};

type TFormErrors = {
  file: boolean;
  author: boolean;
  title: boolean;
};
type TImageMetdata = {
  size: string;
  name: string;
};
const INITIAL_ERROR_STATE = {
  file: false,
  title: false,
  author: false
};

function ImageUpload({ openTrigger, entityType, entityId, user: authStatus }: TImageUploadProps) {
  const router = useRouter();
  const { user, token } = authStatus;
  const [logDialogIsOpen, setLogDialogIsOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [authorCheckbox, setAuthorCheckbox] = useState(user ? true : false);
  const [author, setAuthor] = useState(user !== undefined ? user.fullName : "");
  const [formError, setFormError] = useState<TFormErrors>(INITIAL_ERROR_STATE);
  const imageInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [pickedImage, setPickedImage] = useState<string>();
  const [pickedImageMetadata, setPickedImageMetadata] = useState<TImageMetdata>({
    size: '',
    name: ''
  });

  const handleImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (!file) {
        setPickedImage(undefined);
        return;
      }
      console.log(file)
      setPickedImageMetadata({ size: bytesToSize(file.size), name: file.name });

      setFormError(prevState => {
        return {
          ...prevState,
          file: false
        }
      });
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          setPickedImage(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }
  const handlePickClick = () => {
    if (imageInput.current !== null) {
      imageInput.current.click();
    }
  }


  const handleClose = () => {
    if (formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  };

  const handleCancel = () => {
    if (formRef.current !== null) {
      formRef.current.reset();
    }
    setFormError(INITIAL_ERROR_STATE);
  };

  const handleAuthorCheckboxClick = (value: boolean): void => {
    setAuthorCheckbox(value);
    if (user !== undefined) {
      setAuthor(user?.fullName);
      setFormError((prevState) => {
        const newState = {
          ...prevState,
          author: false
        };
        return newState;
      });
    }
  }

  const handleAuthorChange = (value: string): void => {
    setAuthor(value);
  }

  const onFileUploadProgressChanged = (percentage: number) => {
    setPercentage(Math.round(percentage * 100));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const file: File = fd.get('image') as File;
    const title: string = fd.get('title') as string;
    const formAuthor: string = fd.get('author') as string;
    if ((file.name.length == 0 && file.size == 0) || title.length == 0 || (formAuthor !== null && formAuthor.length == 0)) {
      setFormError((prevState) => {
        const newState = {
          ...prevState,
          file: file.name.length == 0 && file.size == 0,
          title: title.length == 0,
          author: formAuthor !== null && formAuthor.length == 0
        };
        return newState;
      });
      return;
    }
    if (formAuthor === null) {
      fd.set('author', author);
    }

    if (formRef.current !== null) {

      formRef.current.reset();
    }

    if (imageInput.current) {
      imageInput.current.value = "";
    }


    try {
      setPickedImage(undefined);
      await createImageAction(token ?? '', fd, onFileUploadProgressChanged);
      setLogDialogIsOpen(false);
      router.refresh();
    } catch (error) {

    }
    return false;
  }

  const resetImagePreview = () => {
    setPickedImage(undefined);
    if (imageInput.current !== null) {
      imageInput.current.value = "";
    }
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
        disabled: false,
        loading: false,
        dontCloseOnConfirm: true,
      }}
      cancel={{
        label: "Prekliči",
        callback: handleCancel,
        disabled: false,
      }}
      isOpen={logDialogIsOpen}
      closeCallback={handleCancel}
      setIsOpen={setLogDialogIsOpen} >
      <form ref={formRef} onSubmit={handleSubmit}>
        <ProgressBar value={percentage}></ProgressBar>
        <input type="hidden" value={entityId} name="entityId" />
        <input type="hidden" value={entityType} name="entityType" />
        {pickedImage && (
          <div className="flex flex-row justify-between">
            <div className="min-w-14 h-14 relative mb-6">
              <Image
                src={pickedImage}
                alt="Fotografija"
                fill
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="text-neutral-900 w-full pl-4">
              <span>
                {pickedImageMetadata.name}<br />
              </span>
              <span className="text-neutral-400">
                {pickedImageMetadata.size}<br />
              </span>
            </div>
            <div>
              <Button variant="quaternary" type="button" onClick={resetImagePreview}>
                <IconClose />
              </Button>
            </div>
          </div>
        )}
        <input
          className="hidden"
          type='file'
          id='image'
          accept='image/png, image/jpeg'
          name='image'
          onChange={handleImageChanged}
          ref={imageInput} />
        {!pickedImage && <Button type="button" onClick={handlePickClick}>Izberi datoteko</Button>}
        {formError?.file && <div className="mt-1 text-sm text-red-500" id="react-aria4183795666-:r7:">Izberite fotografijo</div>}
        <div className="mt-6 w-80">
          <TextField name="title" ref={titleRef}
            label="Naslov fotografije"
            placeholder="npr. Pogled na steno"
            errorMessage={(formError?.title) ? "Vpišite naslov fotografije" : undefined} />
        </div>
        <div className="mt-6">
          <Checkbox checked={authorCheckbox} onChange={handleAuthorCheckboxClick} label={user?.gender === "F" ? "Sem avtorica fotografije" : "Sem avtor fotografije"} />
        </div>
        <div className="mt-6 w-80">
          <TextField
            name="author"
            label="Avtor/ica fotografije"
            isDisabled={authorCheckbox && (user !== undefined)}
            placeholder="Ime in priimek avtorice oz. avtorja"
            onChange={handleAuthorChange}
            value={author}
            errorMessage={(formError?.author) ? "Vpišite avtorico oz. avtorja fotografije" : undefined} />
        </div>
      </form>
    </Dialog>
  );
}

export default ImageUpload;
