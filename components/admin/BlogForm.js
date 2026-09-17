import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BlogForm({ initialData = {} }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    youtubeLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditMode = !!initialData._id;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        youtubeLink: initialData.youtubeLink || ''
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If title changes → auto-generate slug
    if (name === 'title') {
      const autoSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: autoSlug, // only overwrite slug if it's blank
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditMode
        ? `/api/blogs/${initialData._id}`
        : '/api/blogs';

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.title)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/admin/blogs');
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEditMode
              ? 'Update the blog post details.'
              : 'Fill in the details to create a new blog post.'}
          </p>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
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

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                 className="mt-1 block w-full rounded-md border border-gray-400 p-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    /blog/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    readOnly
                    className="mt-1 block w-full rounded-md border border-gray-400 p-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
               
                  />

                </div>
              </div>

              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-400 p-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
               
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  A brief description of your blog post.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  name="youtubeLink"
                  id="youtubeLink"
                  value={formData.youtubeLink}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-1 block w-full rounded-md border border-gray-400 p-2 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Optional. Paste the full YouTube video URL.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : isEditMode ? (
                  'Update Post'
                ) : (
                  'Create Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
