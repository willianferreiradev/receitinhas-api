import React, { useState } from "react";
import ReactDOM from "react-dom";
import AddNewIngredient from "./AddNewIngredient";

import Swal from "sweetalert2";
import { IngredientsList } from "./IngredientsList";
import axios from "axios";

const swalErrorConfig = {
    title: "Error!",
    text: "You can add a maximum of three ingredients",
    icon: "error",
    confirmButtonText: "Ok",
};

export default function SearchRecipe() {
    const [ingredients, setIngredients] = useState([]);

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

    function handleSubmit() {
        axios
            .get("localhost:8000/api/recipes?i=onions,tomatos")
            .then((r) => console.log(r));
    }

    return (
        <div>
            <AddNewIngredient onSubmit={addNewIngredient} />
            <IngredientsList
                ingredients={ingredients}
                onDelete={deleteIngredient}
            />

            <button onClick={handleSubmit}>Pesquisar</button>
        </div>
    );
}

if (document.getElementById("search-recipe")) {
    ReactDOM.render(<SearchRecipe />, document.getElementById("search-recipe"));
}
