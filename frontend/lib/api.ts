export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
export const AUTH_MODE : 'bearer' | 'cookie' = 'bearer';

export function getToken(): string | null{
    if (AUTH_MODE !== 'bearer') return null;
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

export async function api(path: string, options: { method?:string ; body?: unknown} = {}){
    const headers: Record<string, string> = {'Content-Type': 'application/json'};
    const token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const res = await fetch(API + path, {

        method: options.method || 'GET',
        headers,
        credentials: AUTH_MODE === 'cookie' ? 'include' : 'same-origin',
        body: options.body === undefined ? undefined : JSON.stringify(options.body),

    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Request failed (' + res.status + ')');
    return data; 
}
