import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function AddNewIngredient({ onSubmit }) {
    const [ingredient, setIngredient] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(ingredient);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingredient name"
                    onChange={({ target }) => setIngredient(target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
}
