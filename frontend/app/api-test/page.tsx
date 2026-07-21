'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ApiTest() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const loadData = async () => {
      try {
        const result = await api('/health');
        setData(JSON.stringify(result));
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadData();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;
  return <p>API says: {data}</p>;
}