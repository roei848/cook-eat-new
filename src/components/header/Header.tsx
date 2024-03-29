import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Search} from '@mui/icons-material';
import {Button, ButtonGroup, InputAdornment} from '@mui/material';
import {TextInput} from '../../utils/materialComponents';
import {useOutsideClick} from "../../utils/Helper";
import {logoImage} from '../../utils/globals';
import {Category} from '../../utils/Enums';
import './header.scss'

interface HeaderProps {

}

export default function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isCategoryTabOpen, setIsCategoryTabOpen] = useState<boolean>(false);
    const buttonGroupRef = useRef<HTMLDivElement>(null);

    // Use the custom hook to close the ButtonGroup when clicking outside
    useOutsideClick(buttonGroupRef, () => setIsCategoryTabOpen(false));

    const handleClickOnCategory = (clickedCategory: string) => {
        console.log(clickedCategory);
        navigate("/category/" + clickedCategory.toLowerCase(), { state: { category: clickedCategory } });
        setIsCategoryTabOpen(false);
    }

    const handleHomeTabClick = () => {
        console.log("Click on Home tab");
        navigate("/");
    }

    const handleSubmitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (searchValue.trim() === "") {
                navigate("/");
            } else {
                navigate(`/search?q=${encodeURIComponent(searchValue)}`);
            }
        }
    };

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
                            onClick={() => handleClickOnCategory(value)}
                        >
                            {value}
                        </Button>
                    })}
                </ButtonGroup>}
            </div>
            <div className="search-bar-wrapper">
                <TextInput
                    label=""
                    value={searchValue || ''}
                    setState={setSearchValue}
                    className="search-bar-input"
                    placeholder="Search Configuration"
                    options={{
                        InputProps: {
                            endAdornment: (
                                <InputAdornment className="search-icon" position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        },
                        onKeyDown: handleSubmitSearch
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
