import { supabase } from "./supabase";

export interface FeaturedProperty {
    id: string;
    imageUrl: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    tag: string;
}

export interface StandardProperty {
    id: string;
    imageUrl: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    status: "FOR SALE" | "FOR RENT";
    priceSuffix?: string;
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
        .order("id");

    if (error) {
        console.error("Error fetching featured properties:", error);
        return [];
    }

    return data.map((p) => ({
        id: p.id,
        imageUrl: p.image_url,
        title: p.title,
        location: p.location,
        price: p.price,
        beds: Number(p.beds),
        baths: Number(p.baths),
        area: p.area,
        tag: p.tag ?? "",
    }));
}

export async function getStandardProperties(
    page: number = 1,
    pageSize: number = 6
): Promise<PaginatedResult<StandardProperty>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
        .from("properties")
        .select("*", { count: "exact" })
        .eq("type", "standard")
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
        imageUrl: p.image_url,
        title: p.title,
        location: p.location,
        price: p.price,
        beds: Number(p.beds),
        baths: Number(p.baths),
        area: p.area,
        status: p.status as "FOR SALE" | "FOR RENT",
        priceSuffix: p.price_suffix ?? undefined,
    }));

    return { data: mapped, totalCount, totalPages, currentPage: page };
}
