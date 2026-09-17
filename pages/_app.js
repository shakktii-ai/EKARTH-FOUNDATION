import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import {Navbar} from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
 const adminRoute = ['/admin/dashboard', '/admin/blogs', '/admin/contacts','/admin/blogs/new','/admin/donations'];
 const router = useRouter();

  return (
    <AuthProvider>
      
      <div className="flex flex-col min-h-screen">
       { !adminRoute.includes(router.pathname) && <Navbar />}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
