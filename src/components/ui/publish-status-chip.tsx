// TODO: move to components folder

type TPublishStatusChipProps = {
  publishStatus: string;
  className?: string;
};

function PublishStatusChip({
  publishStatus,
  className,
}: TPublishStatusChipProps) {
  let chipClassName = className ? className + " " : "";
  let text = "";

  switch (publishStatus) {
    case "draft":
      chipClassName += "bg-red-25 text-red-500";
      text = "Osnutek";
      break;

    case "in_review":
      chipClassName += "bg-amber-25 text-amber-500";
      text = "V pregledu";
      break;
  }

  return (
    <div
      className={`inline-flex items-center rounded-lg ${chipClassName} py-1 px-3`}
    >
      {text}
    </div>
  );
}

export default PublishStatusChip;
