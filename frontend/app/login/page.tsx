'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
//import { mergeGuessCart } from '@/lib/cart';

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    async function submit(){
        try{
            setBusy(true);
            setError(null);
            await login(email, password);
            //await mergeGuessCart(); // edge case #9 fires right here, every login
            router.push('/products');
        }
        catch(e) {
            setError((e as Error).message);
        }finally {
            setBusy(false);
        }
    }

    return(
        <main>
            <h1>Login</h1>
            {error && <p role="alert">{error}</p>}

            <input
                placeholder = "Email"
                type = "email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value )}
            />

            <input
                placeholder = "Password"
                type = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value )}
            />

            <button onClick={submit} disabled={busy}>
                {busy ? 'Logging in...' : 'Login'}
            </button>

        </main>
    );
}

