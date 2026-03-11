"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse ml-2" title="Loading Auth"></div>;
  }

  if (!user) {
    return (
      <Link href="/login" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-mosque rounded-lg hover:bg-mosque-dark transition-colors">
        Sign In
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-2 pl-4 border-l border-nordic-dark/10 ml-2 relative group cursor-pointer">
      <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative">
        {avatarUrl ? (
          <Image
            alt="Profile"
            src={avatarUrl}
            fill
            className="object-cover"
          />
        ) : (
          <span className="material-icons text-gray-400 flex items-center justify-center w-full h-full text-xl mt-1">person</span>
        )}
      </div>
      
      {/* Dropdown for sign out */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#152e2a] rounded-lg shadow-soft border border-gray-100 dark:border-mosque/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-1 truncate" title={user.email}>
               {user.email}
            </div>
            <button
            onClick={handleSignOut}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
            >
            Sign Out
            </button>
        </div>
      </div>
    </div>
  );
}
