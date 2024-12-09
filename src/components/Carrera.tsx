import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  title: string;
  img?: string;
  selected: boolean;
  onClick?: () => void;
  styleClass?: string;
}

export default function Carrera({
  title,
  img,
  selected,
  onClick,
  styleClass,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`border
         border-solid
        border-custom-green
        ${selected ? "bg-custom-green/25" : "bg-custom-white"}
         p-2
         w-12/12
         justify-start
         items-center
         flex
         gap-3
         px-4
         font-medium
         rounded-md
         hover:bg-custom-green/25
         duration-150
         ${styleClass}`}
    >
      <Avatar>
        <AvatarImage src={img} />
        <AvatarFallback>ND</AvatarFallback>
      </Avatar>
      <p>{title}</p>
    </button>
  );
}
