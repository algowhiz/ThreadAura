import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to /categories?category=mens when they visit the homepage
    router.push({
      pathname: '/categories',
      query: { category: 'mens' },
    });
  }, []); // Empty dependency array to ensure this runs only once when the component is mounted

  return null; // Nothing to show on the homepage
}
