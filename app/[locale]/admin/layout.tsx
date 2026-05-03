import { AdminGuard } from '@/shared/components/guards/AdminGuard';

export const metadata = {
  title: 'Panel Administrativo',
  description: 'Panel de administración de AstroAssist AI. Acceso restringido.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <main className="min-h-[calc(100vh-8rem)] px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </AdminGuard>
  );
}
