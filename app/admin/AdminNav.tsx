"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const avatarUrl = user?.email 
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
    : null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-mosque/10 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/admin/properties" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded bg-mosque flex items-center justify-center text-white font-bold text-lg">L</div>
              <span className="font-bold text-xl tracking-tight text-nordic-dark">LuxeAdmin</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/admin/properties"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  pathname.includes("/admin/properties")
                    ? "border-mosque text-nordic-dark"
                    : "border-transparent text-nordic-dark/60 hover:text-mosque hover:border-mosque/30"
                }`}
              >
                Propiedades
              </Link>
              <Link
                href="/admin/users"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  pathname.includes("/admin/users")
                    ? "border-mosque text-nordic-dark"
                    : "border-transparent text-nordic-dark/60 hover:text-mosque hover:border-mosque/30"
                }`}
              >
                Usuarios
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-nordic-dark/60 hover:text-mosque hover:border-mosque/30 transition-colors"
              >
                Volver al sitio
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-nordic-dark/40 hover:text-mosque hover:bg-mosque/5 transition-colors">
              <span className="material-icons text-xl">notifications_none</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-nordic-dark/10 relative group">
                {/* Desktop User Info */}
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-semibold text-nordic-dark truncate max-w-[150px]">{user.email?.split('@')[0]}</span>
                  <span className="text-xs text-nordic-dark/60">Administrator</span>
                </div>
                
                {/* Avatar with Dropdown Trigger */}
                <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center border-2 border-transparent group-hover:border-mosque/20 transition-all cursor-pointer overflow-hidden bg-background-light relative">
                   {avatarUrl ? (
                     <img src={avatarUrl} alt="Avatar" width={40} height={40} className="object-cover" />
                   ) : (
                     <span className="material-icons text-mosque text-[20px]">person</span>
                   )}
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-nordic-dark/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                  <div className="p-4 border-b border-nordic-dark/5">
                      <div className="text-sm font-medium text-nordic-dark/70 truncate" title={user.email}>{user.email}</div>
                  </div>
                  <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                      >
                         Cerrar Sesión
                      </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pl-4 border-l border-nordic-dark/10">
                <div className="h-9 w-9 rounded-full bg-neutral-200 animate-pulse"></div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}
