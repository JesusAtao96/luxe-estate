import { getUsersRoles } from "../actions";
import RoleSelect from "./RoleSelect";
import Image from "next/image";

export default async function AdminUsersPage() {
  const users = await getUsersRoles();

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-4 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">Directorio de Usuarios</h1>
          <p className="text-nordic-dark/60 mt-1 text-sm">Gestiona el acceso y los roles de tus usuarios.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-nordic-dark/40 group-focus-within:text-mosque text-xl">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border border-nordic-dark/10 rounded-lg bg-white text-nordic-dark shadow-sm placeholder-nordic-dark/40 focus:ring-2 focus:ring-mosque focus:border-transparent transition-all text-sm"
              placeholder="Buscar por nombre, email..."
              type="text"
            />
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2.5 border border-mosque text-sm font-medium rounded-lg text-mosque bg-transparent hover:bg-mosque/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mosque transition-colors whitespace-nowrap">
            <span className="material-icons text-lg mr-2">add</span>
            Añadir Usuario
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-nordic-dark/10 overflow-x-auto mb-6">
        <button className="pb-3 text-sm font-semibold text-mosque border-b-2 border-mosque whitespace-nowrap">Todos</button>
        <button className="pb-3 text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors whitespace-nowrap">Agentes</button>
        <button className="pb-3 text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors whitespace-nowrap">Asesores</button>
        <button className="pb-3 text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors whitespace-nowrap">Administradores</button>
      </div>

      {/* List Header */}
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
        users.map((user, idx) => {
          // Generar avatar determinástico basado en email
          const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;
          
          return (
            <div key={user.id} className="user-card group relative bg-white rounded-xl p-5 shadow-sm border border-nordic-dark/10 hover:bg-hint-of-green flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-colors">
              
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

      {/* Pagination Container to match design */}
      <footer className="mt-8 pt-6 border-t border-nordic-dark/5 flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-nordic-dark/60">
              Mostrando <span className="font-medium text-nordic-dark">1</span> a <span className="font-medium text-nordic-dark">{users.length}</span> de <span className="font-medium text-nordic-dark">{users.length}</span> usuarios
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-none -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-nordic-dark/50 hover:text-mosque disabled:opacity-50 transition-colors" disabled>
                <span className="material-icons text-xl">chevron_left</span>
              </button>
              <button className="z-10 bg-mosque text-white relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 shadow-sm">
                 1
              </button>
              <button className="bg-transparent text-nordic-dark/70 hover:bg-white hover:text-mosque relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors">
                 2
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-nordic-dark/50 hover:text-mosque disabled:opacity-50 transition-colors">
                <span className="material-icons text-xl">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
