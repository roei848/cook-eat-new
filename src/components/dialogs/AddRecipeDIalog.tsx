import React, {useState} from 'react';
import {Slide} from "@mui/material";
import {Close} from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import {RecipeEntity} from "../../utils/Entities";
import {TransitionProps} from "@mui/material/transitions";
import './dialogs.scss';
import {Relative} from "../../utils/Enums";

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
    const [checkedRelatives, setCheckedRelatives] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedRelatives([...checkedRelatives, value]);
        } else {
            setCheckedRelatives(checkedRelatives.filter(relative => relative !== value));
        }
    };


    console.log(checkedRelatives);

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
                {relativesSection()}
            </div>
        </Dialog>
    );
}
