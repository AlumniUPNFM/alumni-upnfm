import Link from "next/link";

interface Props {
  id?: string;
  text: string;
  selected?: boolean;
  isAnchor?: boolean;
  href?: string;
  styleClass?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

const HeaderButton = ({
  id,
  text,
  selected,
  isAnchor,
  isDisabled: isDisabled,
  href,
  styleClass,
  children,
}: Props) => {
  const baseClass = `flex items-center justify-center text-center p-2 px-4 rounded-full text-sm xl:text-base transition-colors duration-150 outline-none ring-0 ${
    selected
      ? "bg-custom-white text-custom-black"
      : "text-custom-white hover:bg-custom-white hover:text-custom-black"
  }
      ${styleClass}
      ${isDisabled ? "text-gray-100/10 pointer-events-none" : ""}
      `;

  return isAnchor && href ? (
    <Link id={id} className={baseClass} href={href}>
      {text}
      {children}
    </Link>
  ) : (
    <button id={id} className={baseClass}>
      {text}
      {children}
    </button>
  );
};

export default HeaderButton;
