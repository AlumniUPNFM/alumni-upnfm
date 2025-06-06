"use client";

import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { User } from "@/types/types";
import JobList from "@/components/JobList";
import EmpresaList from "@/components/EmpresaList";
import WorkSearch from "@/components/WorkSearch";

export default function Work() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []);

  return (
    <MainLayout>
      <WorkSearch />
      <JobList user={user} />
      <EmpresaList user={user} />
    </MainLayout>
  );
}
