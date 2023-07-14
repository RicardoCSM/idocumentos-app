'use client';

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    type = "button"
}) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                ${outline ? 'bg-white' : 'bg-blue-800'}
                ${outline ? 'border-black' : 'border-blue-800'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-3' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    )
}

export default Button;