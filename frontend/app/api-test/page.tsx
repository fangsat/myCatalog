'use client';

import { useEffect, useState } from 'react';

export default function ApiTest() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:4000/health');
        const result = await response.json();
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