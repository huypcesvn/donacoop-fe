export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='bg-gray-900 p-4 w-64 text-white'>
        <nav>
          <ul className='space-y-2'>
            <li><a href='/admin'>Dashboard</a></li>
            <li><a href='/admin/users'>Users</a></li>
            <li><a href='/admin/settings'>Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className='flex-1 p-6'>{children}</main>
    </div>
  );
}
