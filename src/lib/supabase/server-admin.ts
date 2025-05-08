import {
  createClient as supabaseSDKCreateClient,
  SupabaseClient,
} from "@supabase/supabase-js";
import { Database } from "./database.types";

/**
 * Creates and returns a Supabase admin client.
 * This client is initialized with the service_role key and has admin privileges.
 * It should only be used on the server-side.
 *
 * @throws {Error} If essential environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are not defined.
 * @throws {Error} If the Supabase client fails to initialize for other reasons.
 * @returns {SupabaseClient} The initialized Supabase admin client.
 */
export function createClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    // Log the error for server-side debugging
    console.error(
      "Supabase admin client create error: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is not defined."
    );
    throw new Error(
      "Configuration error: Supabase URL is not defined for admin client."
    );
  }

  if (!serviceRoleKey) {
    // Log the error for server-side debugging
    console.error(
      "Supabase admin client create error: SUPABASE_SERVICE_ROLE_KEY environment variable is not defined."
    );
    throw new Error(
      "Configuration error: Supabase service role key is not defined for admin client."
    );
  }

  try {
    const adminClient = supabaseSDKCreateClient<Database>(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    return adminClient;
  } catch (error) {
    console.error(
      "Supabase admin client create error: Failed to initialize.",
      error
    );
    throw new Error(`Failed to initialize Supabase admin client`);
  }
}
