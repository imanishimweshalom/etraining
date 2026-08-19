import { supabase } from "../../lib/supabase";

export async function getHomeCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFeaturedCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("status", "published")
    .limit(6);

  if (error) {
    throw error;
  }

  return data;
}