
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
    notes?: string[];
    link?: string;
    reviews: string[];
    tags: string[];
    user?: User;
    imageURL?: string;
}

export interface RecipeList {
    id: string;
    title: string;
    recipes: Recipe[];
}

export interface User {
    username: string;
    email: string;
    name: string;
    lists: RecipeList[];
    friends: User[];
    id: string;
}

export interface NewUser extends Omit<User, 'id'> {
    password: string
}