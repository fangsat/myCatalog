'use client';
import {useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {api} from '@/lib/api';
import {formatIDR} from '@/lib/format';
import { Product, Category } from '@/lib/types';


export default function ProductsPage() {
    const[products, setProducts] = useState <Product[] | null>(null);
    const[categories, setCategories] = useState <Category[]>([]);
    const[error, setError] = useState <string | null>(null);

    const router = useRouter();
    const params = useSearchParams();
    const q = params.get('q') ?? '';
    const category = params.get('category') ?? '';
    const[search, setSearch] = useState(q);

    function apply(next: { q?: string, category?: string}){
        const qs = new URLSearchParams();
        const nq = next.q !== undefined ? next.q : q;
        const nc = next.category !== undefined ? next.category : category;
        if (nq) qs.set('q', nq);
        if (nc) qs.set('category', nc);
        router.push('/products?' + qs.toString());
    }

    // useEffect(() => {
    //     api('api/products')
    //     .then(setProducts)
    //     .catch((e) => setError(e.message));
    // }, []);

    useEffect(() => {
        const loadProducts = async () => {
            setProducts(null);
            setError(null);
            try {
                const qs = new URLSearchParams();
                if(q) qs.set('q', q);
                if (category) qs.set('category', category);
                const data = await api('/api/products?' + qs.toString());
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

    }, [q, category]);

    useEffect(() => {
        api('/api/categories').then(setCategories).catch(() => {})
    },[]);

    if (error) return <main><p role="alert">Error: {error}</p></main>;
    if (products === null) return <main><p>Loading products...</p></main>;
    if (products.length === 0) return <main><p>No products match your search or filter.</p></main>;

    return (
        <main>
            <h1>Products</h1>
            <input
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown = {(e) => {if ( e.key === 'Enter' ) apply({ q : search }) ; }}
            />
            <button onClick={() => apply({ q:search })}>Search</button>

            <div>
                <button onClick={() => apply({ category : '' })} disabled = {!category}>
                    All
                </button>
                {categories.map((c) => (
                    <button 
                        key={c.id}
                        onClick={() => apply({category : String(c.id)})}
                        disabled={String(c.id) === category}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            <ul>
                {products.map((p) =>(
                    <li key={p.id}>
                        {p.images[0] && <img src={p.images[0].image_url} alt={p.name} width={160} />}
                        {p.name}-{formatIDR(p.base_price)}
                    </li>
                ))}
            </ul>
        </main>
    );
}