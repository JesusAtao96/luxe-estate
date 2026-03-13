import Link from "next/link";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow mb-20 md:mb-0">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium font-sf-pro">
              <li>
                <Link href="/admin/properties" className="hover:text-mosque transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <span className="material-icons text-xs text-gray-400">chevron_right</span>
              </li>
              <li aria-current="page" className="text-nordic">
                Agregar Nueva
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-nordic tracking-tight mb-2">
              Agregar Nueva Propiedad
            </h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal font-sf-pro">
              Completa los detalles a continuación para crear un nuevo listado. Los campos marcados con * son obligatorios.
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-3">
          <Link
            href="/admin/properties"
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-nordic hover:bg-gray-50 transition-colors font-medium font-sf-pro text-sm"
          >
            Cancelar
          </Link>
          <button
            form="property-form"
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-mosque hover:bg-nordic text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-sf-pro text-sm"
          >
            <span className="material-icons text-sm">save</span>
            Guardar Propiedad
          </button>
        </div>
      </header>

      <PropertyForm />
    </main>
  );
}
