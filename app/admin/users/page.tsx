import { getUsersRoles } from "../actions";
import UsersClientTable from "./UsersClientTable";

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
          <button className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-icons text-base">add</span> Añadir Usuario
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

      <UsersClientTable users={users} />
    </main>
  );
}
