"use client";

import { featuredProperties, standardProperties } from "@/lib/mockData";
import Image from "next/image";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

export default function AdminPropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const allProperties = [...featuredProperties, ...standardProperties];

  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = allProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeProperties = allProperties.filter((p) => !('status' in p) || p.status === 'FOR SALE').length;
  const pendingSale = allProperties.filter((p) => 'status' in p && p.status === 'FOR RENT').length;

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-nordic-dark tracking-tight">Mis Propiedades</h1>
          <p className="text-nordic-dark/50 mt-1">Gestiona tu portafolio y supervisa el rendimiento.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-nordic-dark/10 text-nordic-dark hover:bg-neutral-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2">
            <span className="material-icons text-base">filter_list</span> Filtrar
          </button>
          <button className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            <span className="material-icons text-base">add</span> Añadir Nueva
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-dark/50">Total Propiedades</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{allProperties.length}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
            <span className="material-icons">apartment</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-dark/50">Propiedades Activas</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{activeProperties}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-hint-of-green flex items-center justify-center text-mosque">
            <span className="material-icons">check_circle</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-dark/50">En Alquiler</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{pendingSale}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <span className="material-icons">pending</span>
          </div>
        </div>
      </div>

      {/* Property List Container */}
      <div className="bg-white rounded-xl shadow-sm border border-nordic-dark/10 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-neutral-50/50 border-b border-nordic-dark/10 text-xs font-semibold text-nordic-dark/50 uppercase tracking-wider">
          <div className="col-span-6">Detalles de Propiedad</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {/* List Items */}
        {paginatedProperties.map((property) => (
          <div key={property.id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-nordic-dark/5 hover:bg-background-light transition-colors items-center">
            {/* Property Details */}
            <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
              <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 112px, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-nordic-dark group-hover:text-mosque transition-colors cursor-pointer line-clamp-1">{property.title}</h3>
                <p className="text-sm text-nordic-dark/60 mt-0.5 line-clamp-1">{property.location}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-nordic-dark/40">
                  <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span> {property.beds} Hab</span>
                  <span className="w-1 h-1 rounded-full bg-nordic-dark/20"></span>
                  <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span> {property.baths} Bañ</span>
                  <span className="w-1 h-1 rounded-full bg-nordic-dark/20"></span>
                  <span>{property.area} m²</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-6 md:col-span-2">
               <div className="text-base font-semibold text-nordic-dark">{property.price}{"priceSuffix" in property ? property.priceSuffix : ""}</div>
               <div className="text-xs text-nordic-dark/40 mt-0.5">ID: {property.id}</div>
            </div>

            {/* Status */}
            <div className="col-span-6 md:col-span-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                ${(!('status' in property)  || property.status === 'FOR SALE') && 'bg-hint-of-green text-mosque border-mosque/10'}
                ${('status' in property && property.status === 'FOR RENT') && 'bg-orange-100 text-orange-700 border-orange-200'}
              `}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                  ${(!('status' in property)  || property.status === 'FOR SALE') && 'bg-mosque'}
                  ${('status' in property && property.status === 'FOR RENT') && 'bg-orange-500'}
                `}></span>
                {!('status' in property) ? 'Venta' : property.status === 'FOR SALE' ? 'Venta' : 'Alquiler'}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
              <button className="p-2 rounded-lg text-nordic-dark/40 hover:text-mosque hover:bg-hint-of-green/50 transition-all tooltip-trigger" title="Editar Propiedad">
                 <span className="material-icons text-xl">edit</span>
              </button>
              <button className="p-2 rounded-lg text-nordic-dark/40 hover:text-red-600 hover:bg-red-50 transition-all tooltip-trigger" title="Eliminar Propiedad">
                 <span className="material-icons text-xl">delete_outline</span>
              </button>
            </div>
          </div>
        ))}

        {/* Pagination placeholder matching design */}
        <div className="px-6 py-4 border-t border-nordic-dark/5 flex items-center justify-between bg-neutral-50/50">
           <div className="text-sm text-nordic-dark/50">
               Mostrando <span className="font-medium text-nordic-dark">{Math.min(startIndex + 1, allProperties.length)}</span> a <span className="font-medium text-nordic-dark">{Math.min(startIndex + ITEMS_PER_PAGE, allProperties.length)}</span> de <span className="font-medium text-nordic-dark">{allProperties.length}</span> resultados
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-nordic-dark/10 rounded-md text-nordic-dark/60 hover:bg-white disabled:opacity-50 transition-colors"
                >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-nordic-dark/10 rounded-md text-nordic-dark/60 hover:bg-white disabled:opacity-50 transition-colors"
                >
                Siguiente
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
