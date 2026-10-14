import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';
import { ProtectRoute } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalDonations: 0,
    totalFunds: 0,
    recentBlogs: [],
    recentContacts: [],
    recentDonations: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, contactsRes, donationsRes] = await Promise.all([
          fetch('/api/blogs').catch(() => ({ json: () => ({ success: false }) })),
          fetch('/api/contact').catch(() => ({ json: () => ({ success: false }) })),
          fetch('/api/admin/donations').catch(() => ({ json: () => [] })),
        ]);

        const blogsData = await blogsRes.json().catch(() => ({ success: false }));
        const contactsData = await contactsRes.json().catch(() => ({ success: false }));
        const donationsData = await donationsRes.json().catch(() => []);

        const donationsList = Array.isArray(donationsData) ? donationsData : [];
        const totalFunds = donationsList.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

        setStats({
          totalBlogs: blogsData?.data?.length || 0,
          totalContacts: contactsData?.data?.length || 0,
          totalDonations: donationsList.length,
          totalFunds,
          recentBlogs: blogsData?.data?.slice(0, 3) || [],
          recentContacts: contactsData?.data?.slice(0, 3) || [],
          recentDonations: donationsList.slice(0, 4),
        });
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </AdminLayout>
      </ProtectRoute>
    );
  }

  return (
    <ProtectRoute>
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center mb-6">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Executive Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Live overview of donations, blogs, donor compliance, and inquiries.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Donations Card */}
            <div className="bg-white overflow-hidden shadow-xs rounded-2xl border border-emerald-100 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-emerald-600 rounded-xl p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider">Funds Raised</dt>
                  <dd className="text-xl font-black text-emerald-700 mt-0.5">
                    &#8377; {stats.totalFunds.toLocaleString('en-IN')}
                  </dd>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">{stats.totalDonations} total donors</span>
                <Link href="/admin/donations" className="text-emerald-700 font-bold hover:underline">
                  View all &rarr;
                </Link>
              </div>
            </div>

            {/* Total Donors Card */}
            <div className="bg-white overflow-hidden shadow-xs rounded-2xl border border-blue-100 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-600 rounded-xl p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Donors</dt>
                  <dd className="text-xl font-black text-blue-700 mt-0.5">
                    {stats.totalDonations}
                  </dd>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">PAN / Aadhaar Compliance</span>
                <Link href="/admin/donations" className="text-blue-700 font-bold hover:underline">
                  Audit &rarr;
                </Link>
              </div>
            </div>

            {/* Blogs Card */}
            <div className="bg-white overflow-hidden shadow-xs rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-600 rounded-xl p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider">Blog Posts</dt>
                  <dd className="text-xl font-black text-gray-900 mt-0.5">{stats.totalBlogs}</dd>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link href="/admin/blogs/new" className="text-indigo-600 font-bold hover:underline">
                  + Add Post
                </Link>
                <Link href="/admin/blogs" className="text-gray-500 hover:underline">
                  View all &rarr;
                </Link>
              </div>
            </div>

            {/* Contacts Card */}
            <div className="bg-white overflow-hidden shadow-xs rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-600 rounded-xl p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider">Inquiries</dt>
                  <dd className="text-xl font-black text-gray-900 mt-0.5">{stats.totalContacts}</dd>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">Contact submissions</span>
                <Link href="/admin/contacts" className="text-amber-700 font-bold hover:underline">
                  View &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Donations */}
            <div className="bg-white shadow-xs overflow-hidden rounded-2xl border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Donations</h3>
                <Link href="/admin/donations" className="text-xs font-bold text-green-700 hover:underline">
                  View All &rarr;
                </Link>
              </div>
              <ul className="divide-y divide-gray-100">
                {stats.recentDonations.length > 0 ? (
                  stats.recentDonations.map((d) => (
                    <li key={d._id} className="p-4 hover:bg-gray-50/60 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{d.donorName}</p>
                          <p className="text-xs text-gray-500">{d.email} &bull; {d.mobile}</p>
                          <div className="flex gap-2 mt-1">
                            {(d.pancard || d.pan) && (
                              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">
                                PAN: {d.pancard || d.pan}
                              </span>
                            )}
                            {d.aadhaar && (
                              <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-bold">
                                Aadhaar: {d.aadhaar}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">&#8377; {Number(d.amount || 0).toLocaleString('en-IN')}</p>
                          <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-800">
                            {(d.status || 'success').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center text-sm text-gray-500">No donations recorded yet.</li>
                )}
              </ul>
            </div>

            {/* Recent Contacts */}
            <div className="bg-white shadow-xs overflow-hidden rounded-2xl border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Inquiries</h3>
                <Link href="/admin/contacts" className="text-xs font-bold text-green-700 hover:underline">
                  View All &rarr;
                </Link>
              </div>
              <ul className="divide-y divide-gray-100">
                {stats.recentContacts.length > 0 ? (
                  stats.recentContacts.map((contact) => (
                    <li key={contact._id} className="p-4 hover:bg-gray-50/60 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{contact.subject || 'Inquiry'}</p>
                          <p className="text-xs text-gray-500">{contact.name} &bull; {contact.email}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">{contact.message}</p>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center text-sm text-gray-500">No recent messages.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectRoute>
  );
}
