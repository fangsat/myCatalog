export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface ProductImage{
    id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    sort_order: number;
}

export interface Category{
    id: number;
    name: string;
    parent_id: number | null;
}

export interface Product{
    id: number;
    name: string;
    description: string;
    base_price: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    category_id: number | null;
    images: ProductImage[];
    Category: Category;
}