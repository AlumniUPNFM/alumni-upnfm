import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  heightClass: string;
  idTipo: number;
  widthClass?: string;
}

export default function DesarrolloProfesionalItem({
  title,
  image,
  heightClass,
  idTipo,
  widthClass,
}: Props) {
  return (
    <article className="relative group">
      <Link href={`formaciones/${idTipo}`}>
        <Image
          src={image}
          alt={title}
          width={512}
          height={512}
          className={`${heightClass} ${widthClass} w-full brightness-50 object-cover object-center transition-all duration-150 group-hover:brightness-75 group-hover:scale-105 group-hover:rounded-lg`}
        />
        <span className="absolute bottom-0 w-full py-3">
          <h3 className="text-2xl font-bold mx-auto text-custom-white text-center">
            {title}
          </h3>
        </span>
      </Link>
    </article>
  );
}
