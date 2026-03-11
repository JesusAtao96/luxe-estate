"use client";

import { useTransition } from "react";
import { updateUserRole } from "../actions";

interface RoleSelectProps {
  userId: string;
  currentRole: string;
}

export default function RoleSelect({ userId, currentRole }: RoleSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (!result.success) {
        alert("Hubo un error al actualizar el rol: " + result.error);
      }
    });
  };

  return (
    <div className="relative group w-full md:w-auto">
      <select
        value={currentRole}
        onChange={handleChange}
        disabled={isPending}
        className="appearance-none inline-flex items-center px-4 py-2 pr-10 border border-nordic-dark/10 bg-white shadow-sm text-xs font-medium rounded-lg text-nordic-dark hover:bg-nordic-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-mosque focus:border-transparent transition-colors w-full justify-center disabled:opacity-50 cursor-pointer"
      >
        <option value="user" className="text-nordic-dark bg-white">User</option>
        <option value="admin" className="text-nordic-dark bg-white">Admin</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-nordic-dark group-hover:text-white transition-colors">
        <span className="material-icons text-[16px]">expand_more</span>
      </div>
    </div>
  );
}
