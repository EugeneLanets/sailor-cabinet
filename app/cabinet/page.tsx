'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CabinetPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'hr') {
        router.push('/cabinet/hr');
      } else {
        router.push('/cabinet/sailor');
      }
    }
  }, [user, loading, router]);

  return <div>Загрузка...</div>;
}
