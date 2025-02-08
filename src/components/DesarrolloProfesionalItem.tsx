import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  heightClass?: string;
  idTipo: number;
  widthClass?: string;
}

export default function DesarrolloProfesionalItem({
  image,
  heightClass,
  idTipo,
  widthClass,
}: Props) {
  return (
    <article className="relative group border border-solid border-custom-gray rounded-sm p-2">
      <Link href={`formaciones/${idTipo}`}>
        <Image
          src={image}
          alt="Imagen"
          width={512}
          height={512}
          className={`${heightClass} ${widthClass} h-fit w-60 brightness-50 object-cover object-center transition-all duration-150 group-hover:brightness-75 group-hover:scale-105 group-hover:rounded-lg`}
        />
      </Link>
    </article>
  );
}
