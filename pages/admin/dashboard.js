import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';
import { ProtectRoute } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    recentBlogs: [],
    recentContacts: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you would have an API endpoint for dashboard stats
        const [blogsRes, contactsRes] = await Promise.all([
          fetch('/api/blogs'),
          fetch('/api/contact')
        ]);

        const blogsData = await blogsRes.json();
        const contactsData = await contactsRes.json();

        if (blogsData.success && contactsData.success) {
          setStats({
            totalBlogs: blogsData.data?.length || 0,
            totalContacts: contactsData.data?.length || 0,
            recentBlogs: blogsData.data?.slice(0, 3) || [],
            recentContacts: contactsData.data?.slice(0, 3) || []
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <ProtectRoute>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </AdminLayout>
      </ProtectRoute>
    );
  }

  return (
    <ProtectRoute>
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-sm text-gray-700">
                Welcome to your admin dashboard. Here's what's happening with your website.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Blog Posts Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Blog Posts</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.totalBlogs}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <Link href="/admin/blogs" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            View all
                          </Link>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/admin/blogs/new" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Add new post<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contacts Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Contacts</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.totalContacts}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <Link href="/admin/contacts" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            View all
                          </Link>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/admin/contacts" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View messages<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <p className="mt-1 text-sm text-gray-700">A quick overview of your recent activities.</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Recent Blog Posts */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Blog Posts</h3>
                </div>
                <div className="bg-white overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {stats.recentBlogs.length > 0 ? (
                      stats.recentBlogs.map((blog) => (
                        <li key={blog._id}>
                          <Link href={`/admin/blogs/edit/${blog._id}`} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">{blog.title}</p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-4 sm:px-6">
                        <p className="text-sm text-gray-500">No recent blog posts</p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 text-sm">
                  <Link href="/admin/blogs" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all blog posts<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Messages</h3>
                </div>
                <div className="bg-white overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {stats.recentContacts.length > 0 ? (
                      stats.recentContacts.map((contact) => (
                        <li key={contact._id}>
                          <Link href={`/admin/contacts/${contact._id}`} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">{contact.subject}</p>
                                <p className="text-sm text-gray-500">{contact.name}</p>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <p className="text-sm text-gray-500 truncate">{contact.message.substring(0, 50)}...</p>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p className="text-xs">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-4 sm:px-6">
                        <p className="text-sm text-gray-500">No recent messages</p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 text-sm">
                  <Link href="/admin/contacts" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all messages<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectRoute>
  );
}
