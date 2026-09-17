import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/BlogForm';
import { toast } from 'react-toastify';

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blogs/${id}`);
          const data = await response.json();
          
          if (data.success) {
            setBlog(data.data);
          } else {
            toast.error('Failed to load blog post');
            router.push('/admin/blogs');
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
          toast.error('Error loading blog post');
          router.push('/admin/blogs');
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id, router]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog post updated successfully!');
        router.push('/admin/blogs');
      } else {
        throw new Error(data.error || 'Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error(error.message || 'Error updating blog post');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
        {blog && <BlogForm initialData={blog} onSubmit={handleSubmit} />}
      </div>
    </AdminLayout>
  );
}