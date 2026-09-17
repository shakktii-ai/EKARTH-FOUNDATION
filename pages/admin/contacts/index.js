// /api/contact/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ProtectRoute } from '../../../contexts/AuthContext';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact');
        const data = await response.json();
        
        if (data.success) {
          setContacts(data.data);
        } else {
          setError('Failed to fetch contacts');
        }
      } catch (err) {
        setError('An error occurred while fetching contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      // Update the local state
      setContacts(prev => 
        prev.map(contact => 
          contact._id === id ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      new: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
    };

    const statusText = {
      new: 'New',
      in_progress: 'In Progress',
      resolved: 'Resolved',
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  return (
    <ProtectRoute>
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all contact form submissions.
              </p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="relative rounded-md shadow-sm w-full sm:max-w-xs mb-4 sm:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">
                Status:
              </label>
              <select
                id="status-filter"
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Subject
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredContacts.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-3 py-4 text-sm text-gray-500 text-center">
                              No contacts found.
                            </td>
                          </tr>
                        ) : (
                          filteredContacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {contact.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {contact.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {contact.subject}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {getStatusBadge(contact.status)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatDate(contact.createdAt)}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <div className="flex space-x-2">
                                  <select
                                    value={contact.status}
                                    onChange={(e) => updateStatus(contact._id, e.target.value)}
                                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                  >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                  </select>
                                  <button
                                    onClick={() => router.push(`/admin/contacts/${contact._id}`)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    View
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectRoute>
  );
}
