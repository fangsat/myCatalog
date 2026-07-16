import { api, AUTH_MODE} from './api';

export async function login(email: string, password: string){
    const data = await api('/api/auth/login', {method: 'POST', body: {email, password}});
    if (AUTH_MODE === "bearer") localStorage.setItem('token', data.token);
      // cookie mode: the browser already stored the httpOnly cookie — nothing to do here.
}

export async function logout(){
    if (AUTH_MODE === "bearer") localStorage.removeItem('token');
    else await api('/api/auth/logout', {method: 'POST'});
    window.location.href = '/products';
}

export async function currentUser(){
    try {const d = await api('/api/me'); return d.user;}
    catch{return null;}
}

