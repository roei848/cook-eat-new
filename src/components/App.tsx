import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {addDocument, getDocumentsRealTime} from '../firebase/firestoreCommunicator';
import Header from "./header/Header";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import {globals} from '../utils/globals';
import {RecipeEntity} from "../utils/Entities";
import {Category, Relative} from "../utils/Enums";
import './app.scss';
import {hardcoded_recipes} from "../utils/hardcoded_recipe";

export default function App() {
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);

    useEffect(() => {
        const unsubscribe = getDocumentsRealTime(globals.RecipesCollectionName, setRecipes);

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    console.log(recipes);

    // const addHardcodedRecipe = () => {
    //     const hardcodedRecipe = [
    //         {
    //             "category": Category.mainCourses,
    //             "description": "A smooth, rich pasta dish featuring creamy avocado sauce, perfect for a quick and healthy meal.",
    //             "favorite": true,
    //             "time": 20,
    //             "image": "https://www.eatingwell.com/thmb/gv4EvapYpmuSv4a5CWvPur4lv8I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-avocado-pasta-23551c9c6245436e9349806896ed078d.jpg",
    //             "title": "Creamy Avocado Pasta",
    //             "ingredients": [
    //                 { "name": "Ripe avocados", "quantity": "2" },
    //                 { "name": "Garlic cloves", "quantity": "2" },
    //                 { "name": "Lemon, juiced", "quantity": "1" },
    //                 { "name": "Fresh basil leaves", "quantity": "1/2 cup" },
    //                 { "name": "Olive oil", "quantity": "2 tbsp" },
    //                 { "name": "Pasta of choice", "quantity": "8 ounces" },
    //                 { "name": "Salt and pepper", "quantity": "To taste" }
    //             ],
    //             "steps": [
    //                 { "order": 1, "description": "Cook pasta according to package instructions." },
    //                 { "order": 2, "description": "Blend avocados, garlic, lemon juice, basil, and olive oil until smooth." },
    //                 { "order": 3, "description": "Toss pasta with avocado sauce and season with salt and pepper." },
    //                 { "order": 4, "description": "Serve immediately, garnished with basil." }
    //             ],
    //             "relatives": [Relative.vegetarian, Relative.quickMeals]
    //         },
    //         {
    //             "category": Category.appetizers,
    //             "description": "Crispy, golden brown mushrooms stuffed with a savory blend of cheese and herbs.",
    //             "favorite": true,
    //             "time": 30,
    //             "image": "https://www.sargento.com/assets/Uploads/Recipe/Image/stuffed-mushroom__FillWzExNzAsNTgzXQ.jpg",
    //             "title": "Cheese Stuffed Mushrooms",
    //             "ingredients": [
    //                 { "name": "Large mushrooms", "quantity": "12" },
    //                 { "name": "Cream cheese, softened", "quantity": "1/4 cup" },
    //                 { "name": "Grated Parmesan cheese", "quantity": "2 tbsp" },
    //                 { "name": "Garlic, minced", "quantity": "1 clove" },
    //                 { "name": "Chopped parsley", "quantity": "1 tbsp" },
    //                 { "name": "Breadcrumbs", "quantity": "1/4 cup" },
    //                 { "name": "Olive oil", "quantity": "1 tbsp" },
    //                 { "name": "Salt and pepper", "quantity": "To taste" }
    //             ],
    //             "steps": [
    //                 { "order": 1, "description": "Preheat oven to 375°F (190°C)." },
    //                 { "order": 2, "description": "Remove stems from mushrooms and chop them finely." },
    //                 { "order": 3, "description": "Mix cream cheese, Parmesan, garlic, parsley, and mushroom stems." },
    //                 { "order": 4, "description": "Stuff mushrooms with the mixture, top with breadcrumbs, and drizzle with olive oil." },
    //                 { "order": 5, "description": "Bake for 20 minutes until golden." }
    //             ],
    //             "relatives": [Relative.vegetarian, Relative.snacks]
    //         },
    //         {
    //             "category": Category.desserts,
    //             "description": "Light and fluffy pancakes with a zesty lemon flavor, topped with fresh berries.",
    //             "favorite": true,
    //             "time": 25,
    //             "image": "https://www.livinglou.com/wp-content/uploads/2018/07/blueberry-lemon-pancakes-1.jpg",
    //             "title": "Lemon Berry Pancakes",
    //             "ingredients": [
    //                 { "name": "All-purpose flour", "quantity": "2 cups" },
    //                 { "name": "Granulated sugar", "quantity": "3 tbsp" },
    //                 { "name": "Baking powder", "quantity": "2 tsp" },
    //                 { "name": "Salt", "quantity": "1/2 tsp" },
    //                 { "name": "Milk", "quantity": "1 1/2 cups" },
    //                 { "name": "Eggs", "quantity": "2" },
    //                 { "name": "Lemon zest", "quantity": "1 tbsp" },
    //                 { "name": "Fresh lemon juice", "quantity": "2 tbsp" },
    //                 { "name": "Fresh berries", "quantity": "For serving" },
    //                 { "name": "Maple syrup", "quantity": "For serving" }
    //             ],
    //             "steps": [
    //                 { "order": 1, "description": "Whisk together dry ingredients in a large bowl." },
    //                 { "order": 2, "description": "In another bowl, mix milk, eggs, lemon zest, and juice." },
    //                 { "order": 3, "description": "Combine wet and dry ingredients until smooth." },
    //                 { "order": 4, "description": "Cook on a hot griddle until bubbles form, then flip." },
    //                 { "order": 5, "description": "Serve with fresh berries and maple syrup." }
    //             ],
    //             "relatives": [Relative.breakfast, Relative.vegetarian]
    //         },
    //         {
    //             "category": Category.salads,
    //             "description": "A hearty, nutritious salad featuring roasted sweet potatoes, black beans, and a tangy lime dressing.",
    //             "favorite": true,
    //             "time": 45,
    //             "image": "https://natashaskitchen.com/wp-content/uploads/2021/11/Sweet-Potato-Salad-SQ.jpg",
    //             "title": "Roasted Sweet Potato Salad",
    //             "ingredients": [
    //                 { "name": "Sweet potatoes, cubed", "quantity": "2 cups" },
    //                 { "name": "Olive oil", "quantity": "2 tbsp" },
    //                 { "name": "Black beans, rinsed and drained", "quantity": "1 can (15 oz)" },
    //                 { "name": "Corn, fresh or frozen", "quantity": "1 cup" },
    //                 { "name": "Red onion, finely chopped", "quantity": "1/4 cup" },
    //                 { "name": "Cilantro, chopped", "quantity": "1/4 cup" },
    //                 { "name": "Lime juice", "quantity": "2 tbsp" },
    //                 { "name": "Honey or agave syrup", "quantity": "1 tbsp" },
    //                 { "name": "Salt and pepper", "quantity": "To taste" }
    //             ],
    //             "steps": [
    //                 { "order": 1, "description": "Preheat oven to 425°F (220°C) and roast sweet potatoes with olive oil until tender." },
    //                 { "order": 2, "description": "Mix roasted sweet potatoes, black beans, corn, and red onion in a bowl." },
    //                 { "order": 3, "description": "Whisk together lime juice, honey, salt, and pepper for the dressing." },
    //                 { "order": 4, "description": "Toss salad with dressing and garnish with cilantro before serving." }
    //             ],
    //             "relatives": [Relative.vegetarian, Relative.healthy]
    //         },
    //         {
    //             "category": Category.mainCourses,
    //             "description": "A classic, hearty stew with tender beef, potatoes, and carrots, simmered in a rich, flavorful broth.",
    //             "favorite": true,
    //             "time": 120,
    //             "image": "https://img.taste.com.au/d4JNfJUH/taste/2019/07/classic-beef-stew-151457-2.jpg",
    //             "title": "Classic Beef Stew",
    //             "ingredients": [
    //                 { "name": "Beef chuck, cut into cubes", "quantity": "2 pounds" },
    //                 { "name": "All-purpose flour", "quantity": "1/4 cup" },
    //                 { "name": "Vegetable oil", "quantity": "2 tbsp" },
    //                 { "name": "Onions, chopped", "quantity": "2" },
    //                 { "name": "Garlic cloves, minced", "quantity": "2" },
    //                 { "name": "Beef broth", "quantity": "4 cups" },
    //                 { "name": "Potatoes, cubed", "quantity": "3" },
    //                 { "name": "Carrots, sliced", "quantity": "3" },
    //                 { "name": "Celery stalks, sliced", "quantity": "2" },
    //                 { "name": "Tomato paste", "quantity": "2 tbsp" },
    //                 { "name": "Worcestershire sauce", "quantity": "1 tbsp" },
    //                 { "name": "Bay leaves", "quantity": "2" },
    //                 { "name": "Salt and pepper", "quantity": "To taste" }
    //             ],
    //             "steps": [
    //                 { "order": 1, "description": "Dredge beef in flour and brown in oil in a large pot." },
    //                 { "order": 2, "description": "Add onions and garlic, cooking until softened." },
    //                 { "order": 3, "description": "Stir in beef broth, tomato paste, Worcestershire sauce, and bay leaves." },
    //                 { "order": 4, "description": "Add potatoes, carrots, and celery, and simmer until vegetables are tender." },
    //                 { "order": 5, "description": "Season with salt and pepper, remove bay leaves, and serve." }
    //             ],
    //             "relatives": [Relative.meat]
    //         }
    //     ]
    //
    //
    //     hardcodedRecipe.forEach(recipe => {
    //             addDocument(globals.RecipesCollectionName, recipe)
    //                 .then(id => console.log(`adding ${id} recipe`))
    //                 .catch(err => console.log(err));
    //     }
    //     )
    // }

    // For offline coding
    if (recipes.length === 0) {
        setRecipes(hardcoded_recipes as RecipeEntity[]);
    }

    return (
        <div className="app-wrapper">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage recipes={recipes} />}/>
                    <Route path="/category/:categoryName" element={<CategoryPage recipes={recipes} />}/>
                    <Route path="/search" element={<SearchPage recipes={recipes} />} />
                </Routes>
            </BrowserRouter>
            {/*<button onClick={addHardcodedRecipe}>Click Me!</button>*/}
        </div>
    );
}
