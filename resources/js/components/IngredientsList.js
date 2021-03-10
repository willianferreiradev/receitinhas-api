export const IngredientsList = ({ ingredients, onDelete }) => {
    return (
        <ul className="list-group list-group-flush">
            {ingredients.map((ingredient, index) => (
                <li className="list-group-item" key={index}>
                    {ingredient}

                    <button
                        className="btn btn-danger float-right"
                        onClick={() => onDelete(index)}
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
};
