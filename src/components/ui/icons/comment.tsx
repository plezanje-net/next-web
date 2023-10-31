import { IconSize } from "./icon-size";

type TIconCommentProps = {
  size: IconSize.small | IconSize.regular;
};

function IconComment({ size }: TIconCommentProps) {
  switch (size) {
    case IconSize.small:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="20"
          height="20"
          className="fill-current"
        >
          <path d="M240-384h480v-72H240v72Zm0-132h480v-72H240v72Zm0-132h480v-72H240v72ZM864-96 720-240H168q-29.7 0-50.85-21.15Q96-282.3 96-312v-480q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v696ZM168-312v-480 480Zm582 0 42 42v-522H168v480h582Z" />
        </svg>
      );

    case IconSize.regular:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="24"
          height="24"
          className="fill-current"
        >
          <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
        </svg>
      );
  }
}

export default IconComment;
