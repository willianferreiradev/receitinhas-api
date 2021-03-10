import React, { useState } from "react";
import ReactDOM from "react-dom";
import AddNewIngredient from "./AddNewIngredient";

import Swal from "sweetalert2";
import { IngredientsList } from "./IngredientsList";
import RecipeService from "../services/recipes";
import LoaderComponent from "./Loader";

const swalErrorConfig = {
    title: "Error!",
    text: "You can add a maximum of three ingredients",
    icon: "error",
    confirmButtonText: "Ok",
};

export default function SearchRecipe() {
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function addNewIngredient(ingredient) {
        if (ingredients.length === 3) {
            return Swal.fire(swalErrorConfig);
        }
        const itensCopy = Array.from(ingredients);
        itensCopy.push(ingredient);
        setIngredients(itensCopy);
    }

    function deleteIngredient(index) {
        const itensCopy = Array.from(ingredients);
        itensCopy.splice(index, 1);
        setIngredients(itensCopy);
    }

    async function handleSubmit() {
        setIsLoading(true);
        const { keywords, recipes } = await RecipeService.index(ingredients);
        setIsLoading(false);
        setRecipes(recipes);
    }

    return (
        <div>
            <LoaderComponent active={isLoading} />
            <AddNewIngredient onSubmit={addNewIngredient} />
            <IngredientsList
                ingredients={ingredients}
                onDelete={deleteIngredient}
            />

            <button onClick={handleSubmit}>Pesquisar</button>

            {recipes.map((recipe, index) => (
                <div key={index}>
                    <p>{recipe.title}</p>
                    <img src={recipe.gif} alt="" />
                </div>
            ))}
        </div>
    );
}

if (document.getElementById("search-recipe")) {
    ReactDOM.render(<SearchRecipe />, document.getElementById("search-recipe"));
}
