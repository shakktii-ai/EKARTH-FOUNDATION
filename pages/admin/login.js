import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isEmailValid = cleanEmail === 'ekath@gmail.com' || cleanEmail === 'ekarth@gmail.com' || cleanEmail === 'admin@example.com';
    const isPasswordValid = password === 'Ekath@123' || password === 'admin123';

    if (isEmailValid && isPasswordValid) {
      localStorage.setItem('adminToken', 'dummy-token');
      console.log('Login successful — navigating to admin dashboard...');
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid email or password. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Head>
        <title>Admin Sign In | Ekarth Foundation</title>
      </Head>
      <div className='max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-sm'>
        <div className='text-center mb-6'>
          <div className='w-12 h-12 mx-auto rounded-2xl bg-green-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm mb-3'>
            EF
          </div>
          <h2 className='text-2xl font-black text-gray-900'>
            Ekarth Foundation
          </h2>
          <p className='text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold'>
            Admin Portal Sign In
          </p>
        </div>

        {error && (
          <div className='mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider'>
              Admin Email
            </label>
            <input
              type='email'
              placeholder='Ekath@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-sm'
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className='block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-sm'
              required
              disabled={isLoading}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-bold text-sm shadow-sm disabled:bg-gray-400 cursor-pointer'
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Admin'}
          </button>
        </form>

        <div className='mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500'>
          <p className='font-medium'>Authorized Ekarth Administration Portal</p>
        </div>
      </div>
    </div>
  );
}