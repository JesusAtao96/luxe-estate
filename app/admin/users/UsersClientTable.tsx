"use client";

import { useState } from "react";
import RoleSelect from "./RoleSelect";

interface User {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 5;

export default function UsersClientTable({ users }: { users: User[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic-dark/50 mb-2 mt-8">
        <div className="col-span-4">Detalles del Usuario</div>
        <div className="col-span-3">Rol & Estado</div>
        <div className="col-span-3">Registro e Info</div>
        <div className="col-span-2 text-right">Acciones</div>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-nordic-dark/50 shadow-sm border border-nordic-dark/10 mt-4">
          No se encontraron registros de usuario.
        </div>
      ) : (
        paginatedUsers.map((user, idx) => {
          const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;
          
          return (
            <div key={user.id} className="user-card group relative bg-white rounded-xl p-5 shadow-sm border border-nordic-dark/10 hover:bg-hint-of-green flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-colors mb-4">
              
              {/* Profile Details */}
              <div className="col-span-12 md:col-span-4 flex items-center w-full">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-background-light border-2 border-white">
                     <img src={avatarUrl} alt="Avatar de usuario" width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                </div>
                <div className="ml-4 overflow-hidden">
                  <div className="text-sm font-bold text-nordic-dark truncate" title={user.email}>
                     {user.email.split('@')[0]}
                  </div>
                  <div className="text-xs text-nordic-dark/60 truncate" title={user.email}>
                     {user.email}
                  </div>
                  <div className="mt-1 text-[10px] px-2 py-0.5 inline-block bg-neutral-50 rounded text-nordic-dark/50 group-hover:bg-white/50 transition-colors">
                    ID: #{user.user_id.substring(0, 8).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Role & Status */}
              <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-mosque/10 text-mosque' 
                    : 'bg-neutral-100 text-nordic-dark/70'
                }`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
                <div className="flex items-center text-xs text-nordic-dark/60">
                  <span className={`material-icons text-[14px] mr-1 ${user.role === 'admin' ? 'text-mosque' : 'text-nordic-dark/40'}`}>
                    {user.role === 'admin' ? 'check_circle' : 'schedule'}
                  </span>
                  {user.role === 'admin' ? 'Activo' : 'Ausente'}
                </div>
              </div>

              {/* Stats / Registration Date */}
              <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40">Propiedades</div>
                  <div className="text-sm font-semibold text-nordic-dark">{user.role === 'admin' ? 'ILIMITADO' : (idx * 3 + 2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40">Registro</div>
                  <div className="text-sm font-semibold text-nordic-dark">{new Date(user.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-12 md:col-span-2 w-full flex justify-end relative z-10">
                <RoleSelect userId={user.user_id} currentRole={user.role} />
              </div>
            </div>
          );
        })
      )}

      {/* Pagination Container */}
      <footer className="mt-8 pt-6 border-t border-nordic-dark/5 flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-nordic-dark/60">
              Mostrando <span className="font-medium text-nordic-dark">{Math.min(startIndex + 1, users.length)}</span> a <span className="font-medium text-nordic-dark">{Math.min(startIndex + ITEMS_PER_PAGE, users.length)}</span> de <span className="font-medium text-nordic-dark">{users.length}</span> usuarios
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-none gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium text-nordic-dark/50 hover:text-mosque hover:bg-neutral-50 border border-transparent hover:border-nordic-dark/10 disabled:opacity-50 transition-all">
                <span className="material-icons text-xl">chevron_left</span>
              </button>
              
              <div className="flex items-center justify-center min-w-[32px] font-medium text-sm text-mosque">
                {currentPage}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium text-nordic-dark/50 hover:text-mosque hover:bg-neutral-50 border border-transparent hover:border-nordic-dark/10 disabled:opacity-50 transition-all">
                <span className="material-icons text-xl">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
