import MainLayout from "@/layouts/MainLayout";
import ProfileImage from "@/components/ProfileImage";
import { useEffect, useState } from "react";
import { GetProfile } from "@/services/profiles";
import { User } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface ProfileFieldProps {
  label: string;
  value: string | number | null | undefined;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <div>
    <span className="text-gray-600 font-semibold">{label}</span>
    <p className="text-gray-800">{value || "N/A"}</p>
  </div>
);

export default function ProfileDetail() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { dni } = router.query;

    if (!dni) return;

    const fetchUser = async () => {
      try {
        const dniAsStr = typeof dni === "string" ? dni : dni[0];
        const { isSuccess, data } = await GetProfile(dniAsStr);
        if (isSuccess && data && data.length > 0) {
          setUser(data[0]);
        } else {
          setError("Usuario no encontrado");
        }
      } catch (error) {
        console.error(error);
        setError("Error al obtener los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router.isReady, router.query.dni]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-40">
          <span className="text-gray-500">Cargando...</span>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-40">
          <span className="text-red-500">{error}</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl w-max mx-auto my-12 p-6 bg-white shadow-md rounded-lg font-montserrat">
        <Link
          href="/profiles"
          className="text-primary hover:text-primary-dark font-semibold mb-6 inline-block"
        >
          &larr; Regresar
        </Link>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Imagen de Perfil */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100">
            <ProfileImage
              classNameAvatar="w-full h-full object-cover"
              dni={user!.dni}
              lastNames={user!.last_names}
              names={user!.names}
            />
          </div>
          {/* Información del Usuario */}
          <div className="md:ml-8 mt-6 md:mt-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {user!.names} {user!.last_names}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*<ProfileField label="DNI" value={user!.dni} />*/}
              <ProfileField label="Email" value={user!.email} />
              {/*<ProfileField label="Teléfono" value={user!.phone}/>*/}
              {/*<ProfileField label="Dirección" value={user!.address} />*/}
              {/*<ProfileField
                label="Fecha de Nacimiento"
                value={
                  user!.birthdate
                    ? new Date(user!.birthdate).toLocaleDateString()
                    : null
                }
              />*/}
              <ProfileField label="Carrera" value={user!.degree?.name} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
