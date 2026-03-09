import React from "react";
import Image from "next/image";
import { StandardProperty } from "@/lib/properties";
import Pagination from "@/components/ui/Pagination";

function PropertyCard({ property }: { property: StandardProperty }) {
    const isForRent = property.status === "FOR RENT";

    return (
        <article
            className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col`}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    alt={property.title}
                    src={property.imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic-dark z-10">
                    <span className="material-icons text-lg">favorite_border</span>
                </button>
                <div
                    className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded z-10 ${isForRent ? "bg-mosque/90" : "bg-nordic-dark/90"
                        }`}
                >
                    {property.status}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-lg text-nordic-dark">
                        {property.price}
                        {property.priceSuffix && (
                            <span className="text-sm font-normal text-nordic-muted">
                                {property.priceSuffix}
                            </span>
                        )}
                    </h3>
                </div>
                <h4 className="text-nordic-dark font-medium truncate mb-1">
                    {property.title}
                </h4>
                <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">king_bed</span>{" "}
                        {property.beds}
                    </div>
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">bathtub</span>{" "}
                        {property.baths}
                    </div>
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">square_foot</span>{" "}
                        {property.area}m²
                    </div>
                </div>
            </div>
        </article>
    );
}

interface NewInMarketProps {
    properties: StandardProperty[];
    currentPage: number;
    totalPages: number;
}

export default function NewInMarket({
    properties,
    currentPage,
    totalPages,
}: NewInMarketProps) {
    return (
        <section>
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-light text-nordic-dark">
                        New in Market
                    </h2>
                    <p className="text-nordic-muted mt-1 text-sm">
                        Fresh opportunities added this week.
                    </p>
                </div>
                <div className="hidden md:flex bg-white p-1 rounded-lg">
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
                        All
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                        Buy
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                        Rent
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
}
