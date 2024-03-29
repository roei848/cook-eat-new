import React from 'react';
import {useLocation} from "react-router-dom";
import {RecipeEntity} from "../../utils/Entities";
import RecipeCardsList from "../cards/RecipeCardsList";
import './page.scss'

interface CategoryPageProps {
    recipes: RecipeEntity[];
}

export default function CategoryPage(props: CategoryPageProps) {
    const { state } = useLocation();
    console.log(state)
    console.log(props.recipes)
    const categoryRecipes = props.recipes && props.recipes.filter(recipe => recipe.category === state.category);


    return (
        <div className="page-wrapper">
            {categoryRecipes.length > 0 ? <RecipeCardsList recipes={categoryRecipes} title={`${categoryRecipes} Recipes`}/> :
                <div className="no-recipes-message">{`There are no recipes for ${state.category} currently`}</div>}
        </div>
    );
}
