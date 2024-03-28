import React, {Dispatch, SetStateAction} from 'react';
import {RecipeEntity} from "../../utils/Entities";
import {IconButton} from "@mui/material";
import {Favorite} from "@mui/icons-material";
import './cards.scss'
import {updateDocument} from "../../firebase/firestoreCommunicator";
import {globals} from "../../utils/globals";

interface RecipeCardProps {
    recipe: RecipeEntity;
}

export default function RecipeCard({recipe}: RecipeCardProps) {
    const handleFavoriteClick = (docId: string, recipeData: RecipeEntity) => {
        const newRecipeData = {...recipeData, favorite: !recipeData.favorite};
        updateDocument(globals.RecipesCollectionName, docId, newRecipeData).then(() => {
            console.log(`Successfully updated recipe ${recipe.title}`);
        }).catch((err) => {
            console.error(`Failed to update recipe ${recipe.title}: ${err}`);
        })
    }

    return (
        <div className="recipe-card-wrapper">
            <img className="recipe-card-image" src={recipe.image} alt="" />
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-time-wrapper">
                <div className="recipe-time-text">Time:</div>
                <div className="recipe-time">
                    {recipe.time}
                </div>
            </div>
            <div className="recipe-favorite-icon">
                <IconButton aria-label="add to favorites" onClick={() => handleFavoriteClick(recipe.id, recipe)}>
                    <Favorite className={`${recipe.favorite ? "favorite" : ""}`}/>
                </IconButton>
            </div>
        </div>
    );
}
