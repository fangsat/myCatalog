export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface Product{
    id: number;
    name: string;
    description: string;
    base_price: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}