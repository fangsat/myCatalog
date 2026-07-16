'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage(){
     const router = useRouter();
     const [form, setForm] = useState({name: '', email: '', password: ''});
     const [error, setError] = useState<string | null>(null);
     const [busy, setBusy] = useState(false);

     async function submit(){
        setBusy(true);
        setError(null);

        try{
            //call backend (/api/ is just convention)
            await api('/api/auth/register', { method: 'POST' , body: form })

            router.push('/login');

        }catch(e){
            setError((e as Error).message);
        }finally{
            setBusy(false);
        }
     }

     return(
        <main>
            <h1>Create Account</h1>
            {error && <p role = "alert">{error}</p>}

            <input
                placeholder = "Name"
                value = {form.name}
                onChange = {(e) => setForm({ ...form, name: e.target.value })}
            />

            <input 
                placeholder = "Email"
                type = "email"
                value = {form.email}
                onChange = {(e) => setForm({ ...form, email: e.target.value })}
            />

            <input 
                placeholder = "Password (min 8 chars)"
                type = "password"
                value={form.password}
                onChange = {(e) => setForm({...form, password: e.target.value})}
            />

            <button onClick={submit} disabled={busy}>
                {busy ? 'Creating...' : 'Register' }
            </button>
        </main>
     );
}
