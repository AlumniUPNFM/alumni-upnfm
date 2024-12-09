"use client";

import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
/*import { useEffect, useState } from "react";
import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { User } from "@/types/types";
import JobList from "@/components/JobList";
import EmpresaList from "@/components/EmpresaList";
import WorkSearch from "@/components/WorkSearch";*/

export default function Home() {
 /* const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []); */

  return (
    <MainLayout>
      {/*<WorkSearch />
      <JobList user={user} />
      <EmpresaList user={user} />*/}
      <div className="max-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-thin flex justify-center content-center my-10">👷🏻 Plataforma en Construcción, navega a través del resto de páginas disponibles. 👷🏻</h1>
        <Image
        src="/Contruccion.webp"
        alt="Logo Dinamico"
        width={512}
        height={512}
        ></Image>
      </div>
    </MainLayout>
  );
}
