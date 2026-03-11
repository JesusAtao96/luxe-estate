"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getUsersRoles() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }

  return data;
}

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient();

  // Validate the role
  if (newRole !== "admin" && newRole !== "user") {
    return { success: false, error: "Role invalid." };
  }

  const { error } = await supabase
    .from("user_roles")
    .update({ role: newRole })
    .match({ user_id: userId });

  if (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
