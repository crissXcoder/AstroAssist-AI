import { redirect } from 'next/navigation';

/**
 * Ruta raíz del admin: redirige a gestión de clientes.
 */
export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/admin/users`);
}
