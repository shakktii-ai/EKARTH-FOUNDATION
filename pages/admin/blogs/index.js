import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ProtectRoute } from '../../../contexts/AuthContext';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          setBlogs(blogs.filter(blog => blog._id !== id));
        } else {
          setError('Failed to delete blog post');
        }
      } catch (err) {
        setError('An error occurred while deleting the blog post');
      }
    }
  };

  return (
    <ProtectRoute>
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Blog Posts</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all blog posts on your website.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Blog Post
              </Link>
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
                            Title
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Created At
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {blogs.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-3 py-4 text-sm text-gray-500 text-center">
                              No blog posts found.
                            </td>
                          </tr>
                        ) : (
                          blogs.map((blog) => (
                            <tr key={blog._id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {blog.title}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <Link
                                  href={`/admin/blogs/edit/${blog._id}`}
                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(blog._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
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
