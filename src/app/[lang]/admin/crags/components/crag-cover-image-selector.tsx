import Dialog, { DialogSize } from "@/components/ui/dialog";
import IconImage from "@/components/ui/icons/image";
import { RadioCircle } from "@/components/ui/radio-group";
import { Crag, Image } from "@/graphql/generated";
import { Radio, RadioGroup } from "@headlessui/react";
import NextImage from "next/image";
import { useState } from "react";

type TCragCoverImageSelectorProps = {
  crag: Crag | null;
  value: string | null;
  onChange: (value: string) => void;
  disabled: boolean;
};

function CragCoverImageSelector({
  crag,
  value,
  onChange,
  disabled,
}: TCragCoverImageSelectorProps) {
  const selectedImage =
    crag?.images.find((image) => image.id === value) || null;

  const [buttonImage, setButtonImage] = useState<Image | null>(selectedImage);

  const onConfirm = () => {
    setButtonImage(selectedImage);
  };

  return (
    <>
      <div>Naslovna fotografija</div>

      {!crag || crag.images.length == 0 ? (
        <Dialog
          title="Naslovna fotografija"
          confirm={{ label: "V redu" }}
          openTrigger={
            <button
              type="button"
              className="mt-2 outline-none focus-visible:ring ring-blue-100 rounded-lg"
            >
              <div className="w-15 h-20 border border-neutral-300 rounded-lg text-neutral-400 flex items-center justify-center ">
                <IconImage />
              </div>
            </button>
          }
        >
          <div>
            Plezališče še nima fotografij. Preden lahko izbereš naslovno
            fotografijo moraš v galerijo dodati vsaj eno fotografijo.
          </div>
        </Dialog>
      ) : (
        <Dialog
          title="Naslovna fotografija"
          dialogSize={DialogSize.large}
          confirm={{ label: "V redu", callback: onConfirm }}
          openTrigger={
            <button
              type="button"
              className="mt-2 outline-none focus-visible:ring ring-blue-100 rounded-lg"
              disabled={disabled}
            >
              {buttonImage ? (
                <NextImage
                  draggable="false"
                  className={`rounded-lg block`}
                  style={{
                    width:
                      buttonImage.aspectRatio > 1
                        ? `${60 * buttonImage.aspectRatio}px`
                        : "60px",
                  }}
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASEURL}/${buttonImage.path}.${buttonImage.extension}`}
                  alt={[crag.name, buttonImage.description]
                    .filter((part) => !!part)
                    .join(" - ")}
                  width={buttonImage.maxIntrinsicWidth}
                  height={
                    buttonImage.maxIntrinsicWidth / buttonImage.aspectRatio
                  }
                  quality={100}
                  sizes={
                    buttonImage.aspectRatio > 1
                      ? `${60 * buttonImage.aspectRatio}px`
                      : "60px"
                  }
                />
              ) : (
                <div className="w-15 h-20 border border-neutral-300 rounded-lg text-neutral-400 flex items-center justify-center ">
                  <IconImage />
                </div>
              )}
            </button>
          }
        >
          <div>
            <div>Izberi naslovno fotografijo plezališča.</div>

            <div className="mt-6 columns-[140px] gap-4">
              <RadioGroup value={value} onChange={onChange}>
                {crag?.images.map((image) => (
                  <Radio
                    value={image.id}
                    key={image.id}
                    className={`mb-4 flex flex-col items-center justify-center gap-2 group outline-none break-inside-avoid`}
                  >
                    {({ focus, checked, disabled }) => (
                      <>
                        <NextImage
                          draggable={false}
                          className={`rounded-lg block ${focus ? "ring ring-blue-100" : ""} ${checked ? "opacity-100" : "opacity-50"}`}
                          key={image.id}
                          src={`${process.env.NEXT_PUBLIC_IMAGES_BASEURL}/${image.path}.${image.extension}`}
                          alt={[crag.name, image.description]
                            .filter((part) => !!part)
                            .join(" - ")}
                          width={image.maxIntrinsicWidth}
                          height={image.maxIntrinsicWidth / image.aspectRatio}
                          quality={100}
                          sizes="(max-width: 399px) 295px, (max-width: 595px) 384px, (max-width: 751px) 192px, 140px"
                        />

                        <RadioCircle checked={checked} disabled={disabled} />
                      </>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default CragCoverImageSelector;
