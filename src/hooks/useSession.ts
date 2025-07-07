import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email?: string;
}

/**
 * useSession – lightweight mock of NextAuth's useSession()
 * 1. Reads `user` from localStorage (stringified JSON from login).
 * 2. Returns { user } similar to NextAuth response shape.
 * 3. Can be swapped with real auth (e.g., NextAuth) later.
 */
export default function useSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        // invalid json – clear
        localStorage.removeItem('user');
      }
    }
  }, []);

  return { user };
} 