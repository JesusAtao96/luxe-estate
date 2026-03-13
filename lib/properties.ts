import { supabase } from "./supabase";

export interface FeaturedProperty {
    id: string;
    images: string[];
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    tag: string;
    slug: string;
    lat: number;
    lng: number;
    is_active?: boolean;
}

export interface StandardProperty {
    id: string;
    images: string[];
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    status: "FOR SALE" | "FOR RENT";
    priceSuffix?: string;
    slug: string;
    lat: number;
    lng: number;
    is_active?: boolean;
}

export interface PaginatedResult<T> {
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export async function getFeaturedProperties(): Promise<FeaturedProperty[]> {
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("id")
        .limit(2);

    if (error) {
        console.error("Error fetching featured properties:", error);
        return [];
    }

    return data.map((p) => ({
        id: p.id,
        images: p.images || [],
        title: p.title,
        location: p.location,
        price: p.price,
        beds: Number(p.beds),
        baths: Number(p.baths),
        area: p.area,
        tag: p.tag ?? "",
        slug: p.slug ?? "",
        lat: p.lat ?? 0,
        lng: p.lng ?? 0,
    }));
}

export async function getStandardProperties(
    page: number = 1,
    pageSize: number = 6,
    filters?: {
        query?: string;
        minPrice?: string;
        maxPrice?: string;
        propertyType?: string;
        beds?: string;
        baths?: string;
    }
): Promise<PaginatedResult<StandardProperty>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("properties")
        .select("*", { count: "exact" })
        .eq("type", "standard")
        .eq("is_active", true);

    if (filters?.query) {
        query = query.or(`location.ilike.%${filters.query}%,title.ilike.%${filters.query}%`);
    }
    if (filters?.propertyType && filters.propertyType !== "Any Type" && filters.propertyType !== "All") {
        query = query.eq("tag", filters.propertyType); // Store propertyType in 'tag' column
    }
    if (filters?.beds) {
        query = query.gte("beds", parseInt(filters.beds, 10));
    }
    if (filters?.baths) {
        query = query.gte("baths", parseInt(filters.baths, 10));
    }

    const { data, error, count } = await query
        .order("id")
        .range(from, to);

    if (error) {
        console.error("Error fetching standard properties:", error);
        return { data: [], totalCount: 0, totalPages: 0, currentPage: page };
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const mapped: StandardProperty[] = (data ?? []).map((p) => ({
        id: p.id,
        images: p.images || [],
        title: p.title,
        location: p.location,
        price: p.price,
        beds: Number(p.beds),
        baths: Number(p.baths),
        area: p.area,
        status: p.status as "FOR SALE" | "FOR RENT",
        priceSuffix: p.price_suffix ?? undefined,
        slug: p.slug ?? "",
        lat: p.lat ?? 0,
        lng: p.lng ?? 0,
    }));

    return { data: mapped, totalCount, totalPages, currentPage: page };
}

export async function getPropertyBySlug(slug: string): Promise<FeaturedProperty | StandardProperty | null> {
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error || !data) {
        if (error?.code !== 'PGRST116') {
            console.error("Error fetching property by slug:", error);
        }
        return null;
    }

    const baseProperty = {
        id: data.id,
        images: data.images || [],
        title: data.title,
        location: data.location,
        price: data.price,
        beds: Number(data.beds),
        baths: Number(data.baths),
        area: data.area,
        slug: data.slug ?? "",
        lat: data.lat ?? 0,
        lng: data.lng ?? 0,
    };

    if (data.is_featured) {
        return {
            ...baseProperty,
            tag: data.tag ?? "",
        } as FeaturedProperty;
    }

    return {
        ...baseProperty,
        status: data.status as "FOR SALE" | "FOR RENT",
        priceSuffix: data.price_suffix ?? undefined,
    } as StandardProperty;
}
