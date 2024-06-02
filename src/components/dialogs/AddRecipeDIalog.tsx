import React, {useState} from 'react';
import {Slide} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import Select from 'react-select';
import {AccessTime, Close} from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import {TransitionProps} from "@mui/material/transitions";
import {Category, Relative} from "../../utils/Enums";
import {Ingredient, Step} from "../../utils/Entities";
import './dialogs.scss';

declare interface AddRecipeDialogProps {
    handleClose: (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => void;
    isOpen: boolean;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddRecipeDialog({handleClose, isOpen}: AddRecipeDialogProps) {
    const [recipeTitle, setRecipeTitle] = useState<string>('');
    const [recipeDescription, setRecipeDescription] = useState<string>('');
    const [recipeTime, setRecipeTime] = useState<number>(30);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [checkedRelatives, setCheckedRelatives] = useState<string[]>([]);

    console.log(recipeTitle, recipeDescription, recipeTime, selectedCategory)
    console.log(ingredients)
    console.log(steps)

    const categoryOptions = Object.values(Category).map(category => ({
        value: category,
        label: category
    }));

    // Custom styles for React Select
    const customStyles = {
        control: (base: any) => ({
            ...base,
            background: 'none',
            border: '1px solid #ddd6cb',
            borderRadius: '8px',
            color: '#ddd6cb',
            fontSize: '20px',
            padding: '4px 8px',
            width: '320px', // Adjust width as necessary
            minHeight: '40px', // Minimum height to align with your inputs
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#ddd6cb',
        }),
        menu: (base: any) => ({
            ...base,
            background: '#25200f',
            borderRadius: '8px',
            marginTop: '0',
            width: '320px',
        }),
        option: (styles: any, { isFocused, isSelected }: any) => ({
            ...styles,
            backgroundColor: isFocused ? '#3a2c24' : isSelected ? '#331f14' : undefined,
            color: '#ddd6cb',
            fontSize: '20px',
            cursor: 'pointer',
            ':active': {
                backgroundColor: '#3a2c24',
            },
        }),
    };
    const handleIngredientChange = (index: number, key: keyof Ingredient, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleStepChange = (index: number, key: keyof Step, value: string) => {
        const updatedSteps = [...steps];
        if (key === 'description') {
            updatedSteps[index][key] = value;
        } else if (key === 'order') {
            updatedSteps[index][key] = parseInt(value);
        }
        setSteps(updatedSteps);
    };

    const addStep = () => {
        setSteps([...steps, { order: steps.length + 1, description: '' }]);
    };

    const removeStep = (index: number) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps.map((step, idx) => ({ ...step, order: idx + 1 })));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        if (checked) {
            setCheckedRelatives([...checkedRelatives, value]);
        } else {
            setCheckedRelatives(checkedRelatives.filter(relative => relative !== value));
        }
    };


    console.log(checkedRelatives);

    const generalSection = () => {
        return <div className="general-section">
            <div className="general-title">Enter general details about the recipe</div>
            <div className="general-content-wrapper">
                <div className="my-input-wrapper">
                    <label>Title</label>
                    <input type="text" value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)}/>
                </div>
                <div className="my-input-wrapper">
                    <label>Description</label>
                    <textarea value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}
                              rows={3}/>
                </div>
                <div className="my-input-wrapper">
                    <div className="time-input"><label>Time (min)</label><AccessTime className="time-icon"/></div>
                    <input type="number" value={recipeTime} onChange={(e) => setRecipeTime(parseInt(e.target.value))}
                           min={1} defaultValue={30}/>
                </div>
                <div className="my-input-wrapper">
                    <label>Category</label>
                    <Select
                        styles={customStyles}
                        options={categoryOptions}
                        value={categoryOptions.find(option => option.value === selectedCategory)}
                        onChange={(selectedOption) => setSelectedCategory(selectedOption?.value || null)}
                        placeholder="Select a category"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: '#3a2c24', // Hover color
                                primary: '#331f14', // Selected color
                            },
                        })}
                    />
                </div>
            </div>
        </div>
    }

    const ingredientsSection = () => {
        return (
            <div className="ingredients-section">
                <div className="ingredients-title">Enter required ingredients for this recipe</div>
                <div>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-input-wrapper">
                            <input
                                type="text"
                                placeholder="Ingredient name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            />
                            <button className="remove-ingredient-button" onClick={() => removeIngredient(index)}>
                                <Delete />
                            </button>
                        </div>
                    ))}
                    <button className="add-ingredient-button" onClick={addIngredient}>
                        <Add />
                    </button>
                </div>
            </div>
        );
    };

    const stepsSection = () => {
        return (
            <div className="steps-section">
                <div className="steps-title">Enter steps for this recipe</div>
                <div>
                    {steps.map((step, index) => (
                        <div key={index} className="step-input-wrapper">
                            <span>Step {step.order}</span>
                            <textarea
                                placeholder="Step description"
                                value={step.description}
                                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                rows={1}
                            />
                            <button className="remove-step-button" onClick={() => removeStep(index)}>
                                <Delete />
                            </button>
                        </div>
                    ))}
                    <button className="add-step-button" onClick={addStep}>
                        <Add />
                    </button>
                </div>
            </div>
        );
    };


    const relativesSection = () => {
        return <div className="relatives-section">
            <div className="relatives-title">Choose related themes for this recipe</div>
            <div className="relatives-checkboxes-wrapper">
                {Object.values(Relative).map(relative => (
                    <div key={relative} className="relative-wrapper">
                        <input
                            className="relative-checkbox"
                            type="checkbox"
                            value={relative}
                            checked={checkedRelatives.includes(relative)}
                            onChange={handleCheckboxChange}
                        />
                        {relative}
                    </div>
                ))}
            </div>
        </div>
    }


    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <div className="dialog-wrapper">
                <div className="close-dialog" onClick={handleClose}>
                    <Close fontSize="large"/>
                </div>
                <div className="add-dialog-header">
                    <div className="add-dialog-title">
                        Add A New Recipe
                    </div>
                </div>
                {generalSection()}
                {ingredientsSection()}
                {stepsSection()}
                {relativesSection()}
            </div>
        </Dialog>
    );
}
