'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { User } from '@/lib/types';
import { currentUser, logout } from "@/lib/auth";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {currentUser().then((u) => { setUser(u); setLoaded(true); } )}, []);

    return(
        <header>
            <Link href ="/products">Catalog</Link>{' '}
            <Link href ="/cart">Cart</Link>{' '}
            {!loaded ? null : user ? (
                <>
                    <Link href ="/orders">My Orders</Link>{' '}
                    <Link href ="/complaints">Complaints</Link>{' '}
                    {user.role === 'admin' && <Link href="/admin">Admin</Link>}{' '}
                    <button onClick={logout}>Logout ({user.name})</button>
                </>
                ) : (
                <>
                    <Link href ="/login">Login</Link>{' '}
                    <Link href ="/register">Register</Link>{' '}
                </>  
            )}
        </header>
    );
}

