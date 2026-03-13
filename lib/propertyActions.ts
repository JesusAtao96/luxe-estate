"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface PropertyFormData {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  parking: number;
  area: string;
  year_built?: number | null;
  description?: string;
  type: "featured" | "standard";
  status: "FOR SALE" | "FOR RENT";
  tag?: string;
  price_suffix?: string;
  is_featured?: boolean;
  lat?: number | null;
  lng?: number | null;
  slug?: string;
  amenities?: string[];
  images?: string[];
  is_active?: boolean;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export async function uploadPropertyImage(
  file: File,
  propertyId: string
): Promise<string | null> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const filePath = `${propertyId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deletePropertyImage(filePath: string): Promise<boolean> {
  const supabase = await createClient();
  const pathParts = filePath.split("/storage/v1/object/public/property-images/");
  if (pathParts.length < 2) return false;

  const { error } = await supabase.storage
    .from("property-images")
    .remove([pathParts[1]]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }
  return true;
}

export async function createProperty(
  formData: PropertyFormData,
  imageFiles?: File[]
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();

  const id = crypto.randomUUID();
  const slug = formData.slug || slugify(formData.title) + "-" + id.slice(0, 6);

  const imageUrls: string[] = formData.images || [];

  if (imageFiles && imageFiles.length > 0) {
    for (const file of imageFiles) {
      const url = await uploadPropertyImage(file, id);
      if (url) imageUrls.push(url);
    }
  }

  const { error } = await supabase.from("properties").insert({
    id,
    title: formData.title,
    location: formData.location,
    price: formData.price,
    beds: formData.beds,
    baths: formData.baths,
    parking: formData.parking,
    area: formData.area,
    year_built: formData.year_built || null,
    description: formData.description || null,
    type: formData.type,
    tag: formData.tag || null,
    status: formData.status,
    price_suffix: formData.price_suffix || null,
    is_featured: formData.is_featured ?? false,
    images: imageUrls,
    amenities: formData.amenities || [],
    slug,
    lat: formData.lat || null,
    lng: formData.lng || null,
    is_active: formData.is_active ?? true,
  });

  if (error) {
    console.error("Error creating property:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/");
  return { success: true, id };
}

export async function updateProperty(
  id: string,
  formData: PropertyFormData,
  imageFiles?: File[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const imageUrls: string[] = formData.images || [];

  if (imageFiles && imageFiles.length > 0) {
    for (const file of imageFiles) {
      const url = await uploadPropertyImage(file, id);
      if (url) imageUrls.push(url);
    }
  }

  const slug = formData.slug || slugify(formData.title) + "-" + id.slice(0, 6);

  const { error } = await supabase
    .from("properties")
    .update({
      title: formData.title,
      location: formData.location,
      price: formData.price,
      beds: formData.beds,
      baths: formData.baths,
      parking: formData.parking,
      area: formData.area,
      year_built: formData.year_built || null,
      description: formData.description || null,
      type: formData.type,
      tag: formData.tag || null,
      status: formData.status,
      price_suffix: formData.price_suffix || null,
      is_featured: formData.is_featured ?? false,
      images: imageUrls,
      amenities: formData.amenities || [],
      slug,
      lat: formData.lat || null,
      lng: formData.lng || null,
      is_active: formData.is_active ?? true,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating property:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/");
  revalidatePath(`/properties/${slug}`);
  return { success: true };
}

export async function getPropertyById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getAllPropertiesForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
  return data;
}

export async function deleteProperty(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").update({ is_active: false }).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return { success: true };
}

export async function togglePropertyActiveStatus(id: string, is_active: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").update({ is_active }).eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return { success: true };
}
