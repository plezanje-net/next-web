import Link from "../../../../../../components/ui/link";
import { User } from "../../../../../../graphql/generated";

interface CommentProps {
  datetime: string;
  text: string | null | undefined; // TODO: fix type when BE marks this field as non nullable
  author: User | null | undefined; // TODO: fix type when BE marks this fiels as non nullable
  currentUser: User | undefined;
}

function Comment({ datetime, text, author, currentUser }: CommentProps) {
  return (
    <div>
      <div className="flex items-end justify-between text-neutral-500">
        <div>{formatDatetime(datetime)}</div>
        {currentUser && currentUser.id === author?.id && (
          <div className="text-sm">
            <Link href="#" variant="tertiary">
              uredi
            </Link>
            <Link href="#" variant="tertiary" className="ml-2">
              izbriši
            </Link>
          </div>
        )}
      </div>
      {/* TODO: will be ok, after BE migrates comment contents to strip html tags. But links will have to be detected and properly rendered here */}
      <p className="mt-2">{text}</p>
      <div className="mt-2 text-right font-medium">{author?.fullName}</div>
    </div>
  );
}

function formatDatetime(datetime: string) {
  const monthNames = [
    "januar",
    "februar",
    "marec",
    "april",
    "maj",
    "junij",
    "julij",
    "avgust",
    "septebmer",
    "oktober",
    "november",
    "december",
  ];
  const date = new Date(datetime);
  return `${date.getDate()}. ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ob ${date.getHours()}:${date.getMinutes()}`;
}

export default Comment;
