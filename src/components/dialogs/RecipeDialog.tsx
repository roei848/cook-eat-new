import React from 'react';
import Dialog from '@mui/material/Dialog';
import {RecipeEntity} from "../../utils/Entities";
import './dialog.scss';
import {Close} from "@mui/icons-material";

declare interface RecipeDialogProps {
    handleClose: (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => void;
    isOpen: boolean;
    recipe: RecipeEntity;
}

export default function RecipeDialog({handleClose, isOpen, recipe}: RecipeDialogProps) {
    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            BackdropProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.45)' } }}
            PaperProps={{
                    sx: {
                        width: "90vw",
                        maxWidth: "unset",
                    }}
        }
        >
            <div className="dialog-wrapper">
                <div className="close-dialog" onClick={handleClose}>
                    <Close />
                </div>
                <div className="recipe-dialog-title">
                    {recipe.title}
                </div>
                <div className="recipe-dialog-description">{recipe.description}</div>
                <div className="recipe-dialog-img">
                    <img src={recipe.image} alt="" />
                </div>
                <div className="recipe-ingredients-wrapper">
                    <div className="recipe-ingredients-title">Ingredients</div>
                    {recipe.ingredients.map((ingredient, index) => {
                        return <div className="recipe-ingredient" key={index}>
                            {`${ingredient.quantity} ${ingredient.name}`}
                        </div>
                    }) }
                </div>
                <div className="recipe-steps-wrapper">
                    <div className="recipe-steps-title">Steps</div>
                    {recipe.steps.map((step, index) => {
                        return <div className="recipe-step" key={index}>
                            {`${step.order}. ${step.description}`}
                        </div>
                    }) }
                </div>
            </div>
        </Dialog>
    );
}
