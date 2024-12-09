import Image from "next/image"

interface Props{
    noticia: string;
    tiempo: string;
    img: string;
}
export default function Notificaciones({noticia, tiempo, img,}: Props){
    return(
        <section className="flex justify-between p-6 h-fit">
            <Image
            src={img}
            alt="LOGO"
            width={64}
            height={64}
            ></Image>
            <p className="text-xl flex items-center">{noticia}</p>
            <p className="text-sm flex items-end">{tiempo}</p>
        </section>
    )
}