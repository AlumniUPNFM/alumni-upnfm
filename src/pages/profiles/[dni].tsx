/**
 * @fileoverview Página de Detalle de Perfil - Visualización de un egresado específico
 *
 * Esta página muestra la información detallada de un egresado, incluyendo todos los datos relevantes
 * según el modelo User, con un diseño premium, corporativo y consistente con el resto de la aplicación.
 * Utiliza degradados sutiles, jerarquía visual clara y una presentación profesional de la imagen y los datos.
 */

import MainLayout from "@/layouts/MainLayout";
import ProfileImage from "@/components/ProfileImage";
import { useEffect, useState } from "react";
import { GetProfile } from "@/services/profiles";
import { User } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/**
 * @component ProfileDetail
 * @description Página de detalle para visualizar la información completa de un egresado
 * @returns {JSX.Element} Detalle de perfil de egresado
 */
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
        <div className="flex justify-center items-center min-h-[40vh]">
          <LoadingSpinner text="Cargando perfil..." size={40} variant="default" />
        </div>
      </MainLayout>
    );
  }

  if (error || !user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
            {error || "Usuario no encontrado"}
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="max-w-3xl mx-auto my-12 p-0 md:p-8 font-montserrat">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50/70 to-gray-100 border border-custom-green/10 shadow-sm">
          <div className="flex flex-col items-center justify-center pt-10 pb-6 px-6 bg-gradient-to-b from-custom-green/10 to-transparent">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg ring-4 ring-white bg-gray-200 overflow-hidden flex items-center justify-center mb-4">
              <ProfileImage
                classNameAvatar="rounded-full size-full"
                classNameImage="object-cover"
                dni={user.dni}
                lastNames={user.last_names}
                names={user.names}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-1">
              {user.names} {user.last_names}
            </h1>
            <p className="text-custom-green font-medium text-base md:text-lg mb-2 text-center">
              {user.degree?.name || "Carrera no especificada"}
            </p>
          </div>
          <div className="px-6 py-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Correo electrónico" value={user.email} />
            <ProfileField label="Carrera" value={user.degree?.name} />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

/**
 * @component ProfileField
 * @description Componente auxiliar para mostrar un campo de información del perfil
 * @param {ProfileFieldProps} props - Propiedades del campo
 * @returns {JSX.Element} Campo visual de información
 */
interface ProfileFieldProps {
  label: string;
  value: string | number | null | undefined;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-gray-600 font-semibold text-sm">{label}</span>
    <p className="text-gray-800 text-base break-words min-h-[1.5rem]">{value || "N/A"}</p>
  </div>
);
