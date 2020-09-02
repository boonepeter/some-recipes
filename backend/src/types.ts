
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
    description?: string;
    recipeId: string;
    ingredients: string[];
    directions: string[];
    link?: string;
    notes?: string[];
    reviews?: string[];
    tags?: string[];
    imageURL?: string;
    userId?: string;
    user?: User;
    author?: string;
    cookTime?: number;
    prepTime?: number;
    totalTime?: number;
    recipeCategory?: string[];
    recipeCuisine?: string[];
    nutrition?: object;
    yield?: string;
    preheat?: number;
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
    userId: string;
    token?: string;
    profilePicUrl?: string;
    passwordHash?: string;
}

export interface UserToken {
    email: string;
    id: string;
}

export interface UserWithHash extends User {
    passwordHash: string;
}

export interface NewUser extends Omit<User, 'userId'> {
    password: string
}