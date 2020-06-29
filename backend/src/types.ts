
export interface Ingredient {
    amount: string;
    ingredient: string;
}

export interface Review {
    rating: number;
    comment?: string;
}

export interface Recipe {
    title: string;
    description: string;
    id: string;
    ingredients: string[];
    directions: string[];
    link?: string;
    notes?: string[];
    reviews: string[];
    tags: string[];
    imageURL?: string;
    userId?: string;
}

export interface RecipeList {
    name: string;
    recipes: Recipe[];
}

export interface User {
    username: string;
    email: string;
    name: string;
    lists: RecipeList[];
    friends: User[];
}

export interface UserToken {
    email: string;
    id: string;
}

export interface UserWithHash extends User {
    passwordHash: string;
}
