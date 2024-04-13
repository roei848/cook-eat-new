import React from 'react';
import {RecipeEntity} from "../../utils/Entities";
import RecipeCard from "./RecipeCard";
import './cards.scss'

interface RecipeCardsListProps {
    recipes: RecipeEntity[];
    title: string;
}

export default function RecipeCardsList(props: RecipeCardsListProps) {
    return (
        <div className="cards-section-wrapper">
            <h1 className="title">{props.title}</h1>
            <ul className="cards-list-wrapper">
                {props.recipes.map(recipe => {
                    return <RecipeCard recipe={recipe}/>
                })}
            </ul>
        </div>
    );
}
