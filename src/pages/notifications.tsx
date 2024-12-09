import MainLayout from "@/layouts/MainLayout";
import Notificaciones from "@/components/Notificaciones";

const notificacion = [
  {
    noticia: "Se han añadido 4 nuevas ofertas de trabajo que te podrían interesar.",
    tiempo: "Hace 8 horas",
    img: "/icon_noti.webp",
  }
]

export default function Calendar() {
  return (
    <MainLayout>
      <div className="border-4 border-solid border-primary rounded-2xl my-8">
        <section className="bg-primary h-20"></section>
      <section className="border border-solid border-primary h-fit">
        {
          notificacion.map(({noticia, tiempo, img,}, idx) => (
            <Notificaciones noticia={noticia} tiempo={tiempo} img={img} key={idx}></Notificaciones>
          ))
        }
      </section>
      <section className="border border-solid border-primary h-fit">
        {
          notificacion.map(({noticia, tiempo, img,}, idx) => (
            <Notificaciones noticia={noticia} tiempo={tiempo} img={img} key={idx}></Notificaciones>
          ))
        }
      </section>
      <section className="border border-solid border-primary h-fit">
        {
          notificacion.map(({noticia, tiempo, img,}, idx) => (
            <Notificaciones noticia={noticia} tiempo={tiempo} img={img} key={idx}></Notificaciones>
          ))
        }
      </section>
      <section className="border border-solid border-primary h-fit">
        {
          notificacion.map(({noticia, tiempo, img,}, idx) => (
            <Notificaciones noticia={noticia} tiempo={tiempo} img={img} key={idx}></Notificaciones>
          ))
        }
      </section>
      <section className="border border-solid border-primary h-fit">
        {
          notificacion.map(({noticia, tiempo, img,}, idx) => (
            <Notificaciones noticia={noticia} tiempo={tiempo} img={img} key={idx}></Notificaciones>
          ))
        }
      </section>
      </div>
    </MainLayout>
  );
}
