import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {logoImage} from '../../utils/globals';
import {Search} from '@mui/icons-material';
import {Button, ButtonGroup, InputAdornment} from '@mui/material';
import {TextInput} from '../../utils/materialComponents';
import {useOutsideClick} from "../../utils/Helper";
import {Category} from '../../utils/Enums';
import './header.scss'

interface HeaderProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function Header(props: HeaderProps) {
    const [isCategoryTabOpen, setIsCategoryTabOpen] = useState<boolean>(false);
    const buttonGroupRef = useRef<HTMLDivElement>(null);

    // Use the custom hook to close the ButtonGroup when clicking outside
    useOutsideClick(buttonGroupRef, () => setIsCategoryTabOpen(false));

    const handleClickOnCategory = (clickedCategory: string) => {
        console.log(clickedCategory);
        setIsCategoryTabOpen(false);
    }

    const handleHomeTabClick = () => {
        console.log("Click on Home tab");
    }

    return (
        <div className="header-wrapper">
            <img src={logoImage} alt="" className="header-logo-img"/>
            <div className="home-tab" onClick={handleHomeTabClick}>Home</div>
            <div className="category-tab-wrapper" ref={buttonGroupRef}>
                <div
                    className="categories-tab"
                    onClick={() => setIsCategoryTabOpen(prevState => !prevState)}
                >
                    Categories
                </div>
                {isCategoryTabOpen && <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    className="category-options"
                >
                    {Object.entries(Category).map(([key, value], index) => {
                        return <Button
                            key={index}
                            className="category-option"
                            onClick={() => handleClickOnCategory(key)}
                        >
                            {value}
                        </Button>
                    })}
                </ButtonGroup>}
            </div>
            <div className="search-bar-wrapper">
                <TextInput
                    label=""
                    value={props.searchValue || ''}
                    setState={props.setSearchValue}
                    className="search-bar-input"
                    placeholder="Search Configuration"
                    options={{
                        InputProps: {
                            endAdornment: (
                                <InputAdornment className="search-icon" position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }
                    }
                    }
                />
            </div>
            <div className="add-recipe-button">
                Add Recipe
            </div>
        </div>
    );
}
