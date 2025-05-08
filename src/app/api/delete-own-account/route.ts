export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseAdminClient } from "@/lib/supabase/server-admin";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  let supabaseAdmin: SupabaseClient;

  try {
    supabaseAdmin = createSupabaseAdminClient();
  } catch (error) {
    console.error(
      "Failed to initialize Supabase admin client for API route:",
      error
    );
    return NextResponse.json(
      { error: `Server configuration error: ${error}` },
      { status: 500 }
    );
  }

  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error:
            "Unauthorized: Authorization header with Bearer token is required.",
        },
        { status: 401 }
      );
    }

    const token = authHeader.replace(/^Bearer\s+/, "");

    // 2. Use the admin client to get the user from the token
    const {
      data: { user },
      error: tokenUserError,
    } = await supabaseAdmin.auth.getUser(token);

    if (tokenUserError || !user) {
      console.error(
        "Error validating token or user not found:",
        tokenUserError
      );
      return NextResponse.json(
        {
          error:
            tokenUserError?.message ||
            "Unauthorized: Invalid token or user not found.",
        },
        { status: 401 }
      );
    }
    const requestingUser = user;

    const userIdToDelete = requestingUser.id;

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userIdToDelete
    );

    if (deleteError) {
      console.error("Supabase admin deleteUser error:", deleteError);
      const status = deleteError.status || 500;
      return NextResponse.json(
        { error: deleteError.message || "Failed to delete user account." },
        { status }
      );
    }

    return NextResponse.json(
      { message: "User account deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled error in delete-account API route logic:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
