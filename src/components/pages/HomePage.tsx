import React from 'react';
import {RecipeEntity} from "../../utils/Entities";
import RecipeCardsList from "../cards/RecipeCardsList";
import './page.scss'

interface HomePageProps {
    recipes: RecipeEntity[];
}

export default function HomePage(props: HomePageProps) {
    const favoriteRecipes = props.recipes && props.recipes.filter(recipe => recipe.favorite);


    return (
        <div className="page-wrapper">
            {favoriteRecipes.length > 0 ? <RecipeCardsList recipes={favoriteRecipes} title={"Your Favorite Recipes"}/> :
                <div className="no-recipes-message">There are no favorite recipes currently</div>}
        </div>
    );
}
