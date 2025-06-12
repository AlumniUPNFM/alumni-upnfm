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
    <MainLayout hideMargin>
      <section className="min-h-screen w-full bg-gradient-to-br from-gray-50/70 to-gray-100 font-montserrat">
        <div className="w-full">
          {/* Hero Section */}
          <div className="w-full bg-gradient-to-b from-custom-green/20 to-transparent py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full shadow-xl ring-4 ring-white bg-gray-200 overflow-hidden flex items-center justify-center mb-6">
                  <ProfileImage
                    classNameAvatar="rounded-full size-full"
                    classNameImage="object-cover"
                    dni={user.dni}
                    lastNames={user.last_names}
                    names={user.names}
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
                  {user.names} {user.last_names}
                </h1>
                <p className="text-custom-green font-medium text-lg md:text-xl mb-4 text-center">
                  {user.degree?.name || "Carrera no especificada"}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProfileField label="Correo electrónico" value={user.email} />
                <ProfileField label="Carrera" value={user.degree?.name} />
                {/* Aquí puedes agregar más campos según necesites */}
              </div>
            </div>
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
  <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
    <span className="text-gray-600 font-semibold text-sm uppercase tracking-wide">{label}</span>
    <p className="text-gray-800 text-base break-words min-h-[1.5rem]">{value || "N/A"}</p>
  </div>
);
