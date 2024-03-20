import { Relative, Category } from './Enums';
import {ReactNode} from "react";

export interface RecipeEntity {
    id: string;
    title: string;
    category: Category;
    favorite: boolean;
    description: string;
    ingredients: Ingredient[];
    relatives: Relative[];
    steps: Step[];
    time: number;
    image: any;
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface Step {
    order: number;
    description: string;
}


export interface MenuDropdownItemProps {
    label?: string;
    icon?: ReactNode;
    onClickFunction?: Function;
    value?: string;
}