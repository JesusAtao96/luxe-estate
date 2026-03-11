import { ReactNode } from "react";
import AdminNav from "./AdminNav";

export const metadata = {
  title: "Admin Dashboard - Luxe Estate",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background-light text-nordic-dark min-h-screen flex flex-col font-display antialiased">
      <AdminNav />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center">
         {children}
      </div>

      {/* Footer from properties design */}
      <footer className="mt-auto border-t border-nordic-dark/10 bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-nordic-dark/50">© 2024 Luxe Estate Management. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
