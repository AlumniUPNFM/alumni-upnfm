/**
 * @fileoverview Componente LoadingSpinner - Spinner de carga reutilizable
 * 
 * Este componente proporciona un spinner de carga animado que puede ser utilizado
 * en diferentes partes de la aplicación. Es personalizable a través de props.
 */

interface LoadingSpinnerProps {
  /**
   * Texto que se muestra debajo del spinner
   * @default "Cargando..."
   */
  text?: string;
  /**
   * Tamaño del spinner en píxeles
   * @default 48
   */
  size?: number;
  /**
   * Color del spinner
   * @default "custom-green"
   */
  color?: string;
  /**
   * Color del texto
   * @default "gray-600"
   */
  textColor?: string;
  /**
   * Variante del spinner
   * @default "default"
   */
  variant?: "default" | "minimal" | "pulse";
}

/**
 * @component LoadingSpinner
 * @description Componente de carga con animación personalizable
 * @param {LoadingSpinnerProps} props - Propiedades del componente
 * @returns {JSX.Element} Spinner de carga
 */
export const LoadingSpinner = ({
  text = "Cargando...",
  size = 48,
  color = "custom-green",
  textColor = "gray-600",
  variant = "default",
}: LoadingSpinnerProps) => {
  const getSpinnerClass = () => {
    switch (variant) {
      case "minimal":
        return `border-2 border-${color} border-t-transparent rounded-full animate-spin`;
      case "pulse":
        return `bg-${color} rounded-full animate-pulse`;
      default:
        return `border-4 border-${color} border-t-transparent rounded-full animate-spin`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Spinner principal */}
        <div
          className={getSpinnerClass()}
          style={{ width: size, height: size }}
        ></div>
        
        {/* Efecto de brillo (solo para variante default) */}
        {variant === "default" && (
          <div
            className="absolute inset-0 rounded-full animate-pulse opacity-20"
            style={{
              background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
              width: size,
              height: size,
            }}
          />
        )}
      </div>
      
      {/* Texto con animación de fade */}
      <p 
        className={`mt-4 text-${textColor} font-medium text-sm tracking-wide animate-fade-in`}
        style={{
          animation: "fadeIn 1.5s ease-in-out infinite alternate",
        }}
      >
        {text}
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner; 