import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// No se han añadido hasta el momento restricciones para usuarios a la hora de ver e interactuar con las canciones, pero de hacerse, este middleware se asgurara de que los usuarios no autenticados puedan seguir escuchando musica.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res
  });

  await supabase.auth.getSession();
  return res;
}