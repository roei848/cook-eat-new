import React, {useState, useEffect} from 'react';
import {globals} from '../utils/globals';
import {addDocument, getDocuments, getDocumentsRealTime} from '../firebase/firestoreCommunicator';
import {RecipeEntity} from "../utils/Entities";
import {Category, Relative} from "../utils/Enums";
import Header from "./header/Header";
import {hardcoded_recipes} from "../utils/hardcoded_recipe";
import './app.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        const unsubscribe = getDocumentsRealTime(globals.RecipesCollectionName, setRecipes);

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    console.log(recipes);

    // const addHardcodedRecipe = () => {
    //     const hardcodedRecipe = {
    //         title: 'Classic Tomato Soup',
    //         category: Category.appetizers,
    //         favorite: false,
    //         description: 'A creamy, rich tomato soup perfect as a comforting starter or a light meal.',
    //         ingredients: [
    //             { name: 'Tomatoes, chopped', quantity: '4 cups' },
    //             { name: 'Onion, diced', quantity: '1' },
    //             { name: 'Carrot, diced', quantity: '1' },
    //             { name: 'Celery, diced', quantity: '1 stalk' },
    //             { name: 'Vegetable broth', quantity: '4 cups' },
    //             { name: 'Heavy cream', quantity: '1/2 cup' },
    //             { name: 'Butter', quantity: '2 tbsp' },
    //             { name: 'Salt and pepper', quantity: 'To taste' },
    //         ],
    //         relatives: [Relative.vegetarian, Relative.healthy],
    //         steps: [
    //             { order: 1, description: 'Melt butter in a large pot and sauté onion, carrot, and celery.' },
    //             { order: 2, description: 'Add tomatoes and broth, bring to a simmer.' },
    //             { order: 3, description: 'Cook until vegetables are tender, then blend until smooth.' },
    //             { order: 4, description: 'Stir in cream, season with salt and pepper.' },
    //         ],
    //         time: 45,
    //         image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg'
    //     }
    //
    //     addDocument(globals.RecipesCollectionName, hardcodedRecipe)
    //         .then(id => console.log(`adding ${id} recipe`))
    //         .catch(err => console.log(err));
    // }

    // // For offline coding
    // if (recipes.length === 0) {
    //     setRecipes(hardcoded_recipes as RecipeEntity[]);
    // }

    return (
        <div className="app-wrapper">
            <BrowserRouter>
                <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
                <Routes>
                    <Route path="/" element={<HomePage recipes={recipes} />}/>
                    <Route path="/category/:categoryName" element={<CategoryPage recipes={recipes} />}/>
                </Routes>
            </BrowserRouter>
            {/*<button onClick={addHardcodedRecipe}>Click Me!</button>*/}
        </div>
    );
}
