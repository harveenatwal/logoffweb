import type { SupabaseClient } from "@supabase/supabase-js"; // Or your specific Supabase client type

/**
 * Generates a public URL for a file stored in Supabase Storage.
 * param supabase - The Supabase client instance.
 * @param filePath - The path/key of the file within the bucket.
 * @returns The public URL string for the file, or null if the filePath is invalid or URL cannot be generated.
 */
export function getAvatarPublicUrl(
  supabase: SupabaseClient,
  filePath: string | null | undefined
): string | null {
  if (!filePath) {
    return null;
  }

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data?.publicUrl || null;
}
