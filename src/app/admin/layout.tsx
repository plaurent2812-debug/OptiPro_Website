import AdminSidebar from '@/components/admin/AdminSidebar'
import styles from './admin.module.css'
import { headers } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || ''

  // Ne pas afficher le layout admin (sidebar + fond gris) sur la page de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  )
}
