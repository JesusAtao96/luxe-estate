"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProperty, updateProperty, deletePropertyImage, PropertyFormData } from "@/lib/propertyActions";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

interface ExistingProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  type: "featured" | "standard";
  tag?: string;
  status: "FOR SALE" | "FOR RENT";
  price_suffix?: string;
  is_featured?: boolean;
  images?: string[];
  slug?: string;
  lat?: number | null;
  lng?: number | null;
  year_built?: number | null;
  description?: string;
  amenities?: string[];
  parking?: number;
}

interface PropertyFormProps {
  property?: ExistingProperty;
  isEdit?: boolean;
}

const AMENITIES = [
  "Swimming Pool",
  "Garden",
  "Air Conditioning",
  "Smart Home",
  "Gym",
  "Garage",
  "Security System",
  "Terrace",
];

export default function PropertyForm({ property, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image state
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(property?.images || []);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);

  // Counter & List fields
  const [beds, setBeds] = useState(property?.beds ?? 3);
  const [baths, setBaths] = useState(property?.baths ?? 2);
  const [parking, setParking] = useState(property?.parking ?? 1);
  const [charCount, setCharCount] = useState(property?.description?.length || 0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(property?.amenities || []);

  // Form field refs
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const yearBuiltRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceSuffixRef = useRef<HTMLInputElement>(null);
  const isFeaturedRef = useRef<HTMLInputElement>(null);

  const allImages = [
    ...existingImageUrls.map((url) => ({ url, isNew: false })),
    ...newImagePreviews.map((url, i) => ({ url, isNew: true, file: newImageFiles[i] })),
  ];

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...previews]);
  }, []);

  const handleRemoveExistingImage = async (url: string) => {
    setDeletingImage(url);
    await deletePropertyImage(url);
    setExistingImageUrls((prev) => prev.filter((u) => u !== url));
    setDeletingImage(null);
  };

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    MySwal.fire({
      title: 'Guardando...',
      text: 'Por favor espera mientras se guardan los datos.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formData: PropertyFormData = {
      title: titleRef.current?.value || "",
      location: locationRef.current?.value || "",
      price: priceRef.current?.value || "",
      beds,
      baths,
      parking,
      area: areaRef.current?.value || "",
      year_built: yearBuiltRef.current?.value ? parseInt(yearBuiltRef.current.value) : null,
      description: descriptionRef.current?.value || "",
      type: (typeRef.current?.value as "featured" | "standard") || "standard",
      tag: tagRef.current?.value || undefined,
      status: (statusRef.current?.value as "FOR SALE" | "FOR RENT") || "FOR SALE",
      price_suffix: priceSuffixRef.current?.value || undefined,
      is_featured: isFeaturedRef.current?.checked ?? false,
      lat: latRef.current?.value ? parseFloat(latRef.current.value) : null,
      lng: lngRef.current?.value ? parseFloat(lngRef.current.value) : null,
      images: existingImageUrls,
      amenities: selectedAmenities,
    };

    let result;
    if (isEdit && property?.id) {
      result = await updateProperty(property.id, formData, newImageFiles);
    } else {
      result = await createProperty(formData, newImageFiles);
    }

    if (!result.success) {
      setIsSubmitting(false);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: result.error || "Ocurrió un error al guardar.",
        confirmButtonColor: '#006655'
      });
      return;
    }

    MySwal.close();
    Toast.fire({
      icon: 'success',
      title: isEdit ? 'Propiedad actualizada exitosamente' : 'Propiedad creada exitosamente'
    });
    
    setTimeout(() => router.push("/admin/properties"), 1000);
  };

  return (
    <form id="property-form" onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN */}
      <div className="xl:col-span-8 space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
              <span className="material-icons text-lg">info</span>
            </div>
            <h2 className="text-xl font-bold text-nordic">Información Básica</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="title">
                Título de la Propiedad <span className="text-red-500">*</span>
              </label>
              <input
                ref={titleRef}
                id="title"
                type="text"
                required
                defaultValue={property?.title}
                placeholder="e.g. Modern Penthouse with Ocean View"
                className="w-full text-base px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="price">
                  Precio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-sf-pro text-sm">$</span>
                  <input
                    ref={priceRef}
                    id="price"
                    type="number"
                    required
                    defaultValue={property?.price}
                    placeholder="0.00"
                    className="w-full pl-7 pr-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-medium font-sf-pro"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="priceSuffix">
                  Sufijo de Precio
                </label>
                <input
                  ref={priceSuffixRef}
                  id="priceSuffix"
                  type="text"
                  defaultValue={property?.price_suffix}
                  placeholder="e.g. /mo"
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="status">
                  Estado
                </label>
                <select
                  ref={statusRef}
                  id="status"
                  defaultValue={property?.status || "FOR SALE"}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer"
                >
                  <option value="FOR SALE">For Sale</option>
                  <option value="FOR RENT">For Rent</option>
                  <option value="SOLD">Sold</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="type">
                  Tipo de Listado
                </label>
                <select
                  ref={typeRef}
                  id="type"
                  defaultValue={property?.type || "standard"}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer"
                >
                  <option value="standard">Standard</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="tag">
                  Tag / Categoría
                </label>
                <input
                  ref={tagRef}
                  id="tag"
                  type="text"
                  defaultValue={property?.tag}
                  placeholder="e.g. Villa, Apartment"
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    ref={isFeaturedRef}
                    id="isFeatured"
                    type="checkbox"
                    defaultChecked={property?.is_featured ?? false}
                    className="w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque"
                  />
                  <span className="text-sm font-medium text-nordic group-hover:text-mosque transition-colors font-sf-pro">
                    Destacada (Featured)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
              <span className="material-icons text-lg">description</span>
            </div>
            <h2 className="text-xl font-bold text-nordic">Descripción</h2>
          </div>
          <div className="p-8">
            <div className="mb-3 flex gap-2 border-b border-gray-100 pb-2">
              <button className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_bold</span></button>
              <button className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_italic</span></button>
              <button className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_list_bulleted</span></button>
            </div>
            <textarea
              ref={descriptionRef}
              id="description"
              defaultValue={property?.description || ""}
              placeholder="Describe las características de la propiedad, el vecindario y los puntos de venta únicos..."
              onChange={(e) => setCharCount(e.target.value.length)}
              className="w-full px-4 py-3 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro leading-relaxed resize-y min-h-[200px]"
            />
            <div className="mt-2 text-right text-xs text-gray-400 font-sf-pro">
              {charCount} / 2000 caracteres
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex justify-between items-center bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
                <span className="material-icons text-lg">image</span>
              </div>
              <h2 className="text-xl font-bold text-nordic">Galería</h2>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded font-sf-pro">JPG, PNG, WEBP</span>
          </div>
          <div className="p-8">
            {/* Upload Zone */}
            <div
              className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 p-10 text-center hover:bg-hint-green/10 hover:border-mosque/40 transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-mosque group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-2xl">cloud_upload</span>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-nordic font-sf-pro">Haz clic o arrastra imágenes aquí</p>
                  <p className="text-xs text-gray-400 font-sf-pro">Tamaño máximo 5MB por imagen</p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            {allImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {allImages.map((img, index) => (
                  <div key={img.url} className="aspect-square rounded-lg overflow-hidden relative group shadow-sm">
                    <Image
                      src={img.url}
                      alt={`Property image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-nordic/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] z-10">
                      <button
                        type="button"
                        disabled={deletingImage === img.url}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (img.isNew) {
                            handleRemoveNewImage(newImagePreviews.indexOf(img.url));
                          } else {
                            handleRemoveExistingImage(img.url);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <span className="material-icons text-sm">
                          {deletingImage === img.url ? "hourglass_empty" : "delete"}
                        </span>
                      </button>
                    </div>
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-mosque text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-sf-pro uppercase tracking-wider z-10">
                        Main
                      </span>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-mosque hover:border-mosque hover:bg-hint-green/20 transition-all group"
                >
                  <span className="material-icons group-hover:scale-110 transition-transform">add</span>
                  <span className="text-xs mt-1 font-medium font-sf-pro">Añadir más</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="xl:col-span-4 space-y-8">
        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
              <span className="material-icons text-lg">place</span>
            </div>
            <h2 className="text-lg font-bold text-nordic">Ubicación</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="location">
                Dirección
              </label>
              <input
                ref={locationRef}
                id="location"
                type="text"
                required
                defaultValue={property?.location}
                placeholder="Calle, Ciudad, Código Postal"
                className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="lat">Latitud</label>
                <input
                  ref={latRef}
                  id="lat"
                  type="number"
                  step="any"
                  defaultValue={property?.lat ?? ""}
                  placeholder="40.7128"
                  className="w-full px-3 py-2 rounded-md border-gray-200 bg-gray-50 text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque focus:bg-white transition-all text-sm font-sf-pro"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="lng">Longitud</label>
                <input
                  ref={lngRef}
                  id="lng"
                  type="number"
                  step="any"
                  defaultValue={property?.lng ?? ""}
                  placeholder="-74.0060"
                  className="w-full px-3 py-2 rounded-md border-gray-200 bg-gray-50 text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque focus:bg-white transition-all text-sm font-sf-pro"
                />
              </div>
            </div>
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group mt-4">
              <Image alt="Map view" width={800} height={200} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"/>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-white/90 text-nordic px-3 py-1.5 rounded shadow-sm backdrop-blur-sm text-xs font-bold font-sf-pro flex items-center gap-1">
                  <span className="material-icons text-sm text-mosque">map</span> Previsualizar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
              <span className="material-icons text-lg">straighten</span>
            </div>
            <h2 className="text-lg font-bold text-nordic">Detalles</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs text-gray-500 font-medium font-sf-pro mb-1 block" htmlFor="area">
                  Área (m²)
                </label>
                <input
                  ref={areaRef}
                  id="area"
                  type="text"
                  defaultValue={property?.area}
                  placeholder="0"
                  className="w-full text-left px-3 py-2 rounded border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm"
                />
              </div>
              <div className="group">
                <label className="text-xs text-gray-500 font-medium font-sf-pro mb-1 block" htmlFor="yearBuilt">
                  Año construido
                </label>
                <input
                  ref={yearBuiltRef}
                  id="yearBuilt"
                  type="number"
                  defaultValue={property?.year_built ?? ""}
                  placeholder="YYYY"
                  className="w-full text-left px-3 py-2 rounded border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              {/* Bedrooms */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">bed</span> Habitaciones
                </label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setBeds((v) => Math.max(0, v - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100"
                  >-</button>
                  <input readOnly type="text" value={beds} className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"/>
                  <button
                    type="button"
                    onClick={() => setBeds((v) => v + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100"
                  >+</button>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">shower</span> Baños
                </label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setBaths((v) => Math.max(0, v - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100"
                  >-</button>
                  <input readOnly type="text" value={baths} className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"/>
                  <button
                    type="button"
                    onClick={() => setBaths((v) => v + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100"
                  >+</button>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">directions_car</span> Estacionamiento
                </label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setParking((v) => Math.max(0, v - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100"
                  >-</button>
                  <input readOnly type="text" value={parking} className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"/>
                  <button
                    type="button"
                    onClick={() => setParking((v) => v + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100"
                  >+</button>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Amenities */}
            <div>
              <h3 className="text-sm font-bold text-nordic mb-3 font-sf-pro uppercase tracking-wider text-xs text-gray-500">
                Amenidades
              </h3>
              <div className="space-y-2">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque"
                    />
                    <span className="text-sm text-gray-700 font-sf-pro group-hover:text-nordic transition-colors">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl md:hidden z-40 flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="flex-1 py-3 rounded-lg border border-gray-300 bg-white text-nordic font-medium font-sf-pro"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-lg bg-mosque text-white font-medium font-sf-pro flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="material-icons animate-spin text-sm">refresh</span>
          ) : (
            <span className="material-icons text-sm">save</span>
          )}
          Guardar
        </button>
      </div>
    </form>
  );
}
