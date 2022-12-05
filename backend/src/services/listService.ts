
import RecipeList from "../models/RecipeListSchema";

export const removeRecipeFromList = async (recipeId: string, listId: string) => {
    const recipeList = RecipeList.findById(listId);
    await RecipeList.findByIdAndUpdate(
        listId, { $pull: { "recipes": { _id: recipeId } } }, { upsert: true },
        function(err, node) {
            if (err) {
                console.log(err);
            }
        });
    console.log(recipeList);
}

export const addRecipeToList = async (recipeId: string, listId: string) => {
    await RecipeList.findByIdAndUpdate(
        listId, 
        { $push: { recipes: recipeId } },
    );
}
