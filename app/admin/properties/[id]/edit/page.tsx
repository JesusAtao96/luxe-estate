import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/lib/propertyActions";

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow mb-20 md:mb-0">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <li>
                <Link href="/admin/properties" className="hover:text-mosque transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <span className="material-icons text-xs text-gray-400">chevron_right</span>
              </li>
              <li aria-current="page" className="text-nordic-dark">
                Editar
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark tracking-tight mb-2">
              Editar Propiedad
            </h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal">
              Actualiza los detalles de &ldquo;{property.title}&rdquo;. Los campos marcados con * son obligatorios.
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-3">
          <Link
            href="/admin/properties"
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-nordic-dark hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Cancelar
          </Link>
          <button
            form="property-form"
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-mosque hover:bg-nordic-dark text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <span className="material-icons text-sm">save</span>
            Guardar Cambios
          </button>
        </div>
      </header>

      <PropertyForm
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          beds: Number(property.beds),
          baths: Number(property.baths),
          parking: Number(property.parking ?? 1),
          area: property.area,
          type: property.type as "featured" | "standard",
          tag: property.tag ?? undefined,
          status: property.status as "FOR SALE" | "FOR RENT",
          price_suffix: property.price_suffix ?? undefined,
          is_featured: property.is_featured ?? false,
          images: property.images ?? [],
          slug: property.slug ?? undefined,
          lat: property.lat ?? null,
          lng: property.lng ?? null,
          year_built: property.year_built ?? null,
          description: property.description ?? undefined,
          amenities: property.amenities ?? [],
        }}
        isEdit
      />
    </main>
  );
}
