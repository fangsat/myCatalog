'use client';
import {useState, useEffect} from 'react';

import {api} from '@/lib/api';
import {formatIDR} from '@/lib/format';

interface Product{
    id: number;
    name: string;
    description: string;
    base_price: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function ProductsPage() {
    const[products, setProducts] = useState <Product[] | null>(null);
    const[error, setError] = useState <string | null>(null);
    const x: number = 'hello';

    // useEffect(() => {
    //     api('api/products')
    //     .then(setProducts)
    //     .catch((e) => setError(e.message));
    // }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api('/api/products');
                setProducts(data);
            } catch (err: unknown){
                if (err instanceof Error){
                    setError(err.message);
                } else {
                    setError('An unknown error occured');
                }
            };
        };
        loadProducts();

    }, []);

    if (error) return <main><p role="alert">Error: {error}</p></main>;
    if (products === null) return <main><p>Loading products...</p></main>;
    if (products.length === 0) return <main><p>No products yet.</p></main>;

    return (
        <main>
            <h1>Products</h1>
            <ul>
                {products.map((p) =>(
                    <li key={p.id}>{p.name}-{formatIDR(p.base_price)}</li>
                ))}
            </ul>
        </main>
    );
}