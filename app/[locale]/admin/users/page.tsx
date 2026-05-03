import { AdminUsersPage } from '@/features/admin';

export const metadata = {
  title: 'Gestión de Clientes',
  description: 'Administración de clientes registrados en AstroAssist AI.',
};

/**
 * Página de gestión de clientes en el panel administrativo.
 */
export default function AdminUsersRoute() {
  return <AdminUsersPage />;
}
