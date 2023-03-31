import Icon, { IconProps } from "./icon";

function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" />
    </Icon>
  );
}
export default IconMenu;
