import React, { useState } from 'react';
import Select from 'react-select';
import Dialog from '@mui/material/Dialog';
import CustomStepper from '../stepper/CustomStepper';
import { Slide } from '@mui/material';
import {globals} from '../../utils/globals';
import { Add, Delete } from '@mui/icons-material';
import { Category, Relative } from '../../utils/Enums';
import { AccessTime, Close } from '@mui/icons-material';
import {addDocument} from "../../firebase/firestoreCommunicator";
import { TransitionProps } from '@mui/material/transitions';
import {Ingredient, RecipeEntity, Step} from '../../utils/Entities';
import {toast} from "react-toastify";
import './dialogs.scss';

declare interface AddRecipeDialogProps {
    handleClose: (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => void;
    isOpen: boolean;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ['General', 'Ingredients', 'Steps', 'Relatives'];

export default function AddRecipeDialog({ handleClose, isOpen }: AddRecipeDialogProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [recipeTitle, setRecipeTitle] = useState<string>('');
    const [recipeDescription, setRecipeDescription] = useState<string>('');
    const [recipeTime, setRecipeTime] = useState<number>(30);
    const [recipeCategory, setRecipeCategory] = useState<Category | null>(null);
    const [recipeImageUrl, setRecipeImageUrl] = useState<string>('');
    const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<Step[]>([]);
    const [checkedRelatives, setCheckedRelatives] = useState<string[]>([]);

    const categoryOptions = Object.values(Category).map(category => ({
        value: category,
        label: category
    }));

    const customStyles = {
        control: (base: any) => ({
            ...base,
            background: 'none',
            border: '1px solid #ddd6cb',
            borderRadius: '8px',
            color: '#ddd6cb',
            fontSize: '20px',
            padding: '4px 8px',
            width: '320px',
            minHeight: '40px',
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
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index][key] = value;
        setRecipeIngredients(updatedIngredients);
    };

    const addIngredient = () => {
        setRecipeIngredients([...recipeIngredients, { name: '', quantity: '' }]);
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients.splice(index, 1);
        setRecipeIngredients(updatedIngredients);
    };

    const handleStepChange = (index: number, key: keyof Step, value: string) => {
        const updatedSteps = [...recipeSteps];
        if (key === 'description') {
            updatedSteps[index][key] = value;
        } else if (key === 'order') {
            updatedSteps[index][key] = parseInt(value);
        }
        setRecipeSteps(updatedSteps);
    };

    const addStep = () => {
        setRecipeSteps([...recipeSteps, { order: recipeSteps.length + 1, description: '' }]);
    };

    const removeStep = (index: number) => {
        const updatedSteps = [...recipeSteps];
        updatedSteps.splice(index, 1);
        setRecipeSteps(updatedSteps.map((step, idx) => ({ ...step, order: idx + 1 })));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedRelatives([...checkedRelatives, value]);
        } else {
            setCheckedRelatives(checkedRelatives.filter(relative => relative !== value));
        }
    };

    const renderSection = () => {
        switch (activeStep) {
            case 0:
                return generalSection();
            case 1:
                return ingredientsSection();
            case 2:
                return stepsSection();
            case 3:
                return relativesSection();
            default:
                return null;
        }
    };

    const generalSection = () => {
        return (
            <div className="general-section">
                <div className="general-title">Enter general details about the recipe</div>
                <div className="general-content-wrapper">
                    <div className="my-input-wrapper">
                        <label>Title</label>
                        <input type="text" value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} />
                    </div>
                    <div className="my-input-wrapper">
                        <label>Description</label>
                        <textarea
                            value={recipeDescription}
                            onChange={(e) => setRecipeDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="my-input-wrapper">
                        <div className="time-input">
                            <label>Time (min)</label>
                            <AccessTime className="time-icon" />
                        </div>
                        <input
                            type="number"
                            value={recipeTime}
                            onChange={(e) => setRecipeTime(parseInt(e.target.value))}
                            min={1}
                            defaultValue={30}
                        />
                    </div>
                    <div className="my-input-wrapper">
                        <label>Category</label>
                        <Select
                            styles={customStyles}
                            options={categoryOptions}
                            value={categoryOptions.find(option => option.value === recipeCategory)}
                            onChange={(selectedOption) => setRecipeCategory(selectedOption?.value || null)}
                            placeholder="Select a category"
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#3a2c24',
                                    primary: '#331f14',
                                },
                            })}
                        />
                    </div>
                    <div className="my-input-wrapper">
                        <label>Image Url</label>
                        <input type="text" value={recipeImageUrl} onChange={(e) => setRecipeImageUrl(e.target.value)} />
                    </div>
                </div>
            </div>
        );
    };

    const ingredientsSection = () => {
        return (
            <div className="ingredients-section">
                <div className="ingredients-title">Enter required ingredients for this recipe</div>
                <div>
                    {recipeIngredients.map((ingredient, index) => (
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
                    {recipeSteps.map((step, index) => (
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
        return (
            <div className="relatives-section">
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
        );
    };

    const validateGeneralSection = () => {
        if (!recipeTitle.trim()) {
            alert("Please enter a title.");
            return false;
        }
        if (!recipeDescription.trim()) {
            alert("Please enter a description.");
            return false;
        }
        if (!recipeTime || recipeTime < 1) {
            alert("Please enter a valid time.");
            return false;
        }
        if (!recipeCategory) {
            alert("Please select a category.");
            return false;
        }
        if (!recipeImageUrl.trim()) {
            alert("Please enter an image URL.");
            return false;
        }
        return true;
    };

    const validateIngredientsSection = () => {
        if (recipeIngredients.length === 0) {
            alert("Please add at least one ingredient.");
            return false;
        }
        for (const ingredient of recipeIngredients) {
            if (!ingredient.name.trim()) {
                alert("Please enter the name of each ingredient.");
                return false;
            }
            if (!ingredient.quantity.trim()) {
                alert("Please enter the quantity of each ingredient.");
                return false;
            }
        }
        return true;
    };

    const validateStepsSection = () => {
        if (recipeSteps.length === 0) {
            alert("Please add at least one step.");
            return false;
        }
        for (const step of recipeSteps) {
            if (!step.description.trim()) {
                alert("Please enter a description for each step.");
                return false;
            }
        }
        return true;
    };

    const validateRelativesSection = () => {
        if (checkedRelatives.length === 0) {
            alert("Please select at least one related theme.");
            return false;
        }
        return true;
    };


    const handleNext = () => {
        let isValid = false;

        switch (activeStep) {
            case 0:
                isValid = validateGeneralSection();
                break;
            case 1:
                isValid = validateIngredientsSection();
                break;
            case 2:
                isValid = validateStepsSection();
                break;
            case 3:
                isValid = validateRelativesSection();
                break;
            default:
                break;
        }

        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        const newRecipe: RecipeEntity = {
            title: recipeTitle,
            category: recipeCategory as Category,
            favorite: false,
            description: recipeDescription,
            ingredients: recipeIngredients,
            relatives: checkedRelatives as Relative[],
            steps: recipeSteps,
            time: recipeTime,
            image: recipeImageUrl,
        }

        addDocument(globals.RecipesCollectionName, newRecipe).then(() => {
            toast.success("Recipes added successfully");
        }).catch((err) => {
            console.error(err);
            toast.error(err);
        });
    };

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <div className="dialog-wrapper">
                <div className="close-dialog" onClick={handleClose}>
                    <Close fontSize="large" />
                </div>
                <div className="add-dialog-header">
                    <div className="add-dialog-title">Add A New Recipe</div>
                </div>
                <CustomStepper
                    steps={steps}
                    activeStep={activeStep}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                >
                    {renderSection()}
                </CustomStepper>
            </div>
        </Dialog>
    );
}
