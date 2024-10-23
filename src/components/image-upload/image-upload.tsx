'use client'
import Button from "@/components/ui/button";
import Dialog, { DialogSize, DialogTitleSize } from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, ReactElement, useRef, useState } from "react";
import Checkbox from "../ui/checkbox";
import TextField from "../ui/text-field";
import createImageAction from "./server-actions/create-image-action";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
type TImageUploadProps = {
  openTrigger: ReactElement;
  entityType: string;
  entityId: string;
};

function ImageUpload({ openTrigger, entityType, entityId }: TImageUploadProps) {
  const router = useRouter();

  const [logDialogIsOpen, setLogDialogIsOpen] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [pickedImage, setPickedImage] = useState<string>();
  function handleImageChanged(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];
      if (!file) {
        setPickedImage(undefined);
        return;
      }
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          setPickedImage(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file)
    }
  }
  function handlePickClick() {
    if (imageInput.current !== null) {
      imageInput.current.click();
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    debugger
    const file: File = fd.get('image') as File;
    if (file.name.length == 0 && file.size == 0) {
      return false;
    }

    if (formRef.current !== null) {

      formRef.current.reset();
    }

    if (imageInput.current) {
      imageInput.current.value = "";
    }
    try {
      setPickedImage(undefined);
      // await createImageAction(fd);
      // router.refresh();
    } catch (error) {

    }
    return false;
  };

  const handleClose = () => {
    if (formRef.current !== null) {

      formRef.current.requestSubmit();
    }
  };
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
        dontCloseOnConfirm: false,
      }}
      cancel={{
        label: "Prekliči",
        disabled: false,
      }}
      isOpen={logDialogIsOpen}
      setIsOpen={setLogDialogIsOpen} >
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="hidden" value={entityId} name="entityId" />
        <input type="hidden" value={entityType} name="entityType" />
        {pickedImage && (
          <div className="min-w-40 h-40 relative mb-6">
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
        <Button type="button" onClick={handlePickClick}>Izberi datoteko</Button>
        <div className="mt-6 w-80">
          <TextField name="title" ref={titleRef}
            label="Naslov fotografije"
            placeholder="npr. Pogled na steno"
            errorMessage="Vpišite naslov fotografije" />
        </div>
        <div className="mt-6">
          <Checkbox label="Sem avtor/ica fotografije" />
        </div>
        <div className="mt-6 w-80">
          <TextField
            name="author"
            label="Avtor/ica fotografije"
            isDisabled={false}
            placeholder="Ime in priimek avtorja" />
        </div>
      </form>
    </Dialog>
  );
}

export default ImageUpload;
