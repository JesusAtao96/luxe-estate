"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterModal, { FilterOptions } from "./FilterModal";

interface HeroProps {
    dict: Record<string, string>;
    currentType?: string;
}

export default function Hero({ dict, currentType: initialType = "All" }: HeroProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(searchParams?.get("query") || "");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        if (searchInput) {
            params.set("query", searchInput);
        } else {
            params.delete("query");
        }
        params.set("page", "1");
        router.push(`/?${params.toString()}`);
    };

    const handleApplyFilters = (filters: FilterOptions) => {
        const params = new URLSearchParams(searchParams?.toString() || "");

        if (filters.query) params.set("query", filters.query);
        else params.delete("query");

        if (filters.minPrice) params.set("minPrice", filters.minPrice);
        else params.delete("minPrice");

        if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
        else params.delete("maxPrice");

        if (filters.propertyType) params.set("propertyType", filters.propertyType);
        else params.delete("propertyType");

        if (filters.beds) params.set("beds", filters.beds.toString());
        else params.delete("beds");

        if (filters.baths) params.set("baths", filters.baths.toString());
        else params.delete("baths");

        params.set("page", "1");
        router.push(`/?${params.toString()}`);
    };

    const handleTypeFilter = (type: string) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        if (type === "All") {
            params.delete("propertyType");
        } else {
            params.set("propertyType", type);
        }
        params.set("page", "1");
        router.push(`/?${params.toString()}`);
    };

    const currentType = searchParams?.get("propertyType") || initialType;
    return (
        <section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark  leading-tight">
                    {dict.titleStart}{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10 font-medium">{dict.titleHighlight}</span>
                        <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
                    </span>
                    .
                </h1>
                <div className="relative group max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white  text-nordic-dark  shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white  transition-all text-lg focus:outline-none"
                        placeholder={dict.placeholder}
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
                    >
                        {dict.search}
                    </button>
                </div>
                <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
                    <button
                        onClick={() => handleTypeFilter("All")}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 ${currentType === "All" ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                    >
                        {dict.filterAll}
                    </button>
                    <button
                        onClick={() => handleTypeFilter("House")}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${currentType === "House" ? "bg-nordic-dark text-white shadow-lg" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                    >
                        {dict.filterHouse}
                    </button>
                    <button
                        onClick={() => handleTypeFilter("Apartment")}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${currentType === "Apartment" ? "bg-nordic-dark text-white shadow-lg" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                    >
                        {dict.filterApartment}
                    </button>
                    <button
                        onClick={() => handleTypeFilter("Villa")}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${currentType === "Villa" ? "bg-nordic-dark text-white shadow-lg" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                    >
                        {dict.filterVilla}
                    </button>
                    <button
                        onClick={() => handleTypeFilter("Penthouse")}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${currentType === "Penthouse" ? "bg-nordic-dark text-white shadow-lg" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                    >
                        {dict.filterPenthouse}
                    </button>
                    <div className="min-w-[1px] w-[1px] h-6 bg-nordic-dark/10 mx-2"></div>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
                    >
                        <span className="material-icons text-base">tune</span> {dict.filters}
                    </button>
                </div>
            </div>

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </section>
    );
}
