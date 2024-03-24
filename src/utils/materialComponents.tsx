import React, {Dispatch, ReactNode, SetStateAction} from "react";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, CheckboxProps, Menu, Select, SelectChangeEvent, TextField, TextFieldProps} from "@mui/material";
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {MenuDropdownItemProps} from "./Entities";
import {SelectProps} from "@mui/material/Select/Select";
import "./globals.scss";


interface TextInputProps {
    label: string;
    value: string;
    setState?: React.Dispatch<SetStateAction<string>>;
    required?: boolean;
    className?: string;
    type?: string;
    placeholder?: string;
    options?: TextFieldProps;
}

export const TextInput = ({
                              label,
                              value,
                              setState,
                              required,
                              className,
                              type,
                              placeholder,
                              options
                          }: TextInputProps): JSX.Element => {
    return (
        <TextField
            variant="outlined"
            label={label}
            value={value}
            className={className}
            type={type}
            required={required}
            onChange={(e) => {
                setState && setState(e.target.value);
            }}
            placeholder={placeholder}
            {...options}
        />
    )
};

interface MenuDropdownProps {
    menuAnchorEl: HTMLElement | null;
    isOpen: boolean;
    handleClose: () => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    menuItems: MenuDropdownItemProps[];
}

export const MenuDropdown = ({
                                 menuAnchorEl,
                                 isOpen,
                                 handleClose,
                                 anchorOrigin,
                                 transformOrigin,
                                 menuItems,
                             }: MenuDropdownProps): JSX.Element => {
    return <Menu
        anchorEl={menuAnchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
    >
        {menuItems.map((menuItem, index) => {
            return <MenuItem
                key={index}
                onClick={() => {
                    menuItem.onClickFunction && menuItem.onClickFunction();
                    handleClose();
                }}
                style={{paddingRight: '40px'}}
            >
                {menuItem.icon ? <div style={{marginRight: '10px'}}>{menuItem.icon}</div> : null}{menuItem.label}
            </MenuItem>
        })}
    </Menu>
}

interface SelectDropdownProps {
    variant?: 'standard' | 'outlined' | 'filled';
    handleChange: (event: SelectChangeEvent<any>, child?: ReactNode) => void;
    value: string;
    menuItems: MenuDropdownItemProps[];
    id?: string;
    options?: SelectProps;
}

export const SelectDropdown = ({
                                   id,
                                   variant,
                                   handleChange,
                                   value,
                                   menuItems,
                                   options
                               }: SelectDropdownProps): JSX.Element => {
    return <Select
        variant={variant || "standard"}
        id={id}
        value={value}
        onChange={handleChange}
        className="select-dropdown"
        disableUnderline
        {...options}
    >
        {menuItems.map((item, index) => {
            return <MenuItem
                key={index}
                value={item.value}
            >
                <div className="menu-item">
                    <span className="menu-item-icon">{item.icon}</span>{item.label}
                </div>
            </MenuItem>
        })}
    </Select>
}

interface CheckboxComponentProps {
    handleChange: Dispatch<SetStateAction<boolean>>;
    isChecked: boolean;
    color?: "primary" | "secondary" | "default" | undefined;
    size?: "small" | "medium" | undefined;
    options?: CheckboxProps;
}


export const CheckboxComponent = ({
                                      isChecked,
                                      handleChange,
                                      color,
                                      size,
                                      options
                                  }: CheckboxComponentProps): JSX.Element => {
    return <Checkbox
        color={color || "default"}
        size={size || "small"}
        checked={isChecked}
        onChange={e => {
            handleChange(e.target.checked);
        }}
        disableRipple
        {...options}
    />
}
