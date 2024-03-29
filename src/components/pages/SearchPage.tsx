import React from 'react';
import {useSearchParams} from "react-router-dom";
import {RecipeEntity} from "../../utils/Entities";
import RecipeCardsList from "../cards/RecipeCardsList";
import './page.scss'

interface SearchPageProps {
    recipes: RecipeEntity[];
}

export default function SearchPage(props: SearchPageProps) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') as string;
    const matchingRecipes = props.recipes && props.recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));


    return (
        <div className="page-wrapper">
            {matchingRecipes.length > 0 ?
                <RecipeCardsList recipes={matchingRecipes} title={`Match Recipes for: ${searchQuery}`}/> :
                <div className="no-recipes-message">{`There are no matching recipes for: ${searchQuery}`}</div>
            }
        </div>
    );
}
