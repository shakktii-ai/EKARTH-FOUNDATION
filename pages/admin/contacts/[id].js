// /api/contact/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ProtectRoute } from '../../../contexts/AuthContext';

export default function ContactDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/contact/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setContact(data.data);
          setStatus(data.data.status);
          setNotes(data.data.notes || '');
        } else {
          setError('Failed to fetch contact details');
        }
      } catch (err) {
        setError('An error occurred while fetching contact details');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status,
          notes: notes || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update contact');
      }

      // Update the local state
      setContact(prev => ({
        ...prev,
        status,
        notes: notes || ''
      }));

      // Show success message
      setError('');
      alert('Contact updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update contact');
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

  if (!contact) {
    return (
      <ProtectRoute>
        <AdminLayout>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Contact not found
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  The requested contact could not be found.
                </p>
              </div>
            </div>
          </div>
        </AdminLayout>
      </ProtectRoute>
    );
  }

  return (
    <ProtectRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Contact Message
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                onClick={() => router.push('/admin/contacts')}
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Contacts
              </button>
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

          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {contact.subject}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Received on {formatDate(contact.createdAt)}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">From</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {contact.name} &lt;{contact.email}&gt;
                  </dd>
                </div>
                {contact.phone && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contact.phone}
                    </dd>
                  </div>
                )}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {getStatusBadge(contact.status)}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Message</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line sm:mt-0 sm:col-span-2">
                    {contact.message}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <textarea
                      rows="4"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Add internal notes here..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
              <form onSubmit={handleStatusUpdate} className="flex justify-end space-x-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectRoute>
  );
}
