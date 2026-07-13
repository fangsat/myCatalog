'use client';

import { useEffect, useState } from "react";

export default function ApiTest() {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:4000/health')
        .then((r) => r.json())
        .then((d) => setData(JSON.stringify(d)))
        .catch((e) => setError(e.message))
        
    }, []);

    if(error) return <p>Error: {error}</p>;
    if(!data) return <p>Loading...</p>;
    return <p>API says: {data}</p>;
}