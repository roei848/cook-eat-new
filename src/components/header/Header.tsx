import React, {Dispatch, SetStateAction} from 'react';
import {logoImage} from '../../utils/globals';
import {Search} from '@mui/icons-material';
import {InputAdornment} from '@mui/material';
import {MenuDropdown, TextInput} from '../../utils/materialComponents';
import {Category} from '../../utils/Enums';
import './header.scss'

interface HeaderProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function Header(props: HeaderProps) {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };


    const categoryItems = Object.entries(Category).map(([key, value]) => ({
        value: key,
        label: value,
        onClickFunction: () => console.log(`${value} clicked`)
    }));

    return (
        <div className="header-wrapper">
            <img src={logoImage} alt="" className="header-logo-img"/>
            <div className="home-tab">Home</div>
            <div className="categories-tab" onClick={handleOpenMenu}>Categories</div>
            <MenuDropdown
                menuAnchorEl={menuAnchorEl}
                isOpen={isMenuOpen}
                handleClose={handleCloseMenu}
                menuItems={categoryItems}/>
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
                Add Recipe +
            </div>
        </div>
    );
}
