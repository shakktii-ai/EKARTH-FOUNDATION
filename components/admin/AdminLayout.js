import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-green-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                  EF
                </span>
                <span className="text-lg font-bold text-gray-900 tracking-tight">Ekarth Admin</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  href="/admin/dashboard"
                  className={`${
                    router.pathname === '/admin/dashboard'
                      ? 'border-green-600 text-green-900 font-bold'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/donations"
                  className={`${
                    router.pathname.startsWith('/admin/donations')
                      ? 'border-green-600 text-green-900 font-bold'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition`}
                >
                  Donations &amp; 80G
                </Link>
                <Link
                  href="/admin/blogs"
                  className={`${
                    router.pathname.startsWith('/admin/blogs')
                      ? 'border-green-600 text-green-900 font-bold'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition`}
                >
                  Blogs
                </Link>
                <Link
                  href="/admin/contacts"
                  className={`${
                    router.pathname.startsWith('/admin/contacts')
                      ? 'border-green-600 text-green-900 font-bold'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition`}
                >
                  Contacts
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
              <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 font-mono">
                {user?.email || 'admin@example.com'}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3.5 py-1.5 border border-transparent text-xs font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 transition cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 sm:py-8">
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
