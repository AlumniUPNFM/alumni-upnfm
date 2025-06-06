import Image from "next/image";
import Link from "next/link";
import SocialMedia from "./SocialMedia";

const Footer = (
  {
    hideMargin = false,
  }: Readonly<{
    hideMargin?: boolean;
  }>
) => {
  return (
    <footer className={`bg-primary py-12 ${hideMargin ? "mt-0" : "mt-24"} font-montserrat`}>
      <div className="xl:mx-36 flex flex-col w-full gap-6 text-white">
        <span className="flex flex-col xl:flex-row gap-2">
          <span className="w-full xl:w-6/12 flex items-center justify-center xl:justify-start">
            <Image
              src="/logo.webp"
              alt=""
              width={512}
              height={512}
              className="w-40"
            />
          </span>
          <nav className="w-full xl:w-3/12 flex flex-col items-center xl:items-start gap-3">
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/oferta_academica"
              className="hover:underline font-bold"
            >
              Oferta Académica
            </Link>
            <Link target="_blank" href="/" className="hover:underline">
              Transparencia
            </Link>
            <Link
              target="_blank"
              href="https://portalunico.iaip.gob.hn/"
              className="hover:underline"
            >
              Portal Único
            </Link>
            <Link
              target="_blank"
              href="https://sielho.iaip.gob.hn/inicio/"
              className="hover:underline"
            >
              SIELHO
            </Link>
            <Link
              target="_blank"
              href="http://sicc.honducompras.gob.hn/HC/procesos/busquedahistorico.aspx"
              className="hover:underline"
            >
              Honducompras
            </Link>
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/comite_probidad_y_etica_"
              className="hover:underline"
            >
              Comité Probidad y Ética
            </Link>
          </nav>
          <nav className="w-full xl:w-3/12 flex flex-col items-center xl:items-start gap-3">
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/quienes_somos"
              className="hover:underline font-bold"
            >
              Sobre UPNFM
            </Link>
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/recorrido_virtual"
              className="hover:underline"
            >
              Recorrido Virtual
            </Link>
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/centros"
              className="hover:underline"
            >
              Centros Regionales
            </Link>
            <Link
              target="_blank"
              href="https://www.upnfm.edu.hn/preguntas_frecuentes"
              className="hover:underline"
            >
              Preguntas Frecuentes
            </Link>
            <Link
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLScQWeVP09fy6o28SOaHix8TRBMZ38VCAWkG_StDuBtCoj3VnA/viewform?usp=send_form"
              className="hover:underline"
            >
              Tu Opinión es Importante
            </Link>
          </nav>
        </span>
        <span className="flex flex-col xl:flex-row gap-2 items-center py-12">
          <span className="w-6/12 flex flex-col">
            <strong>
              <h6 className="font-bold">
                Universidad Pedagógica Nacional Francisco Morazán
              </h6>
            </strong>
            <span>
              Colonia el Dorado, Frente a Miraflores - Tel: 2239-8842 |
              2235-8349 | 2239-8002 | 2235-6062, Fax. 2231-1257
            </span>
          </span>
          <span className="w-full xl:w-6/12 flex justify-center xl:justify-start mt-4 xl:mt-0 gap-2">
            <SocialMedia />
          </span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
