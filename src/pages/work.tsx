"use client";

import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { User } from "@/types/types";
import JobList from "@/components/JobList";
import EmpresaList from "@/components/EmpresaList";
import WorkSearch from "@/components/WorkSearch";
import { useRouter } from "next/navigation";

export default function Work() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
    
    if (!user) {
      router.push("/");
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <WorkSearch />
      <JobList user={user} />
      <EmpresaList user={user} />
    </MainLayout>
  );
}
