import React from 'react';
import {Slide} from "@mui/material";
import {Close} from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import {RecipeEntity} from "../../utils/Entities";
import {TransitionProps} from "@mui/material/transitions";
import './dialogs.scss';

declare interface RecipeDialogProps {
    handleClose: (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => void;
    isOpen: boolean;
    recipe: RecipeEntity;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeDialog({handleClose, isOpen, recipe}: RecipeDialogProps) {
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
                <div className="recipe-dialog-header">
                    <div className="recipe-dialog-header-content">
                        <div className="recipe-dialog-title">
                            {recipe.title}
                        </div>
                        <div className="recipe-dialog-description">{recipe.description}</div>
                    </div>
                    <div className="recipe-dialog-img">
                        <img src={recipe.image} alt="" />
                    </div>
                </div>
                <div className="recipe-dialog-content">
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
            </div>
        </Dialog>
    );
}
