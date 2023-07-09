'use client';

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors
}) => {

    return(
        <div className="w-full relative">
            <label
                className={`
                    text-md
                    ${errors[id] ? 'text-red-600' : 'text-zinc-400'}
                `}
            >
                {label}
            </label>
            <input 
                id={id}
                disabled={disabled}
                {... register(id, {required})}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    p-2
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-red-600' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-red-600' : 'border-black'}
                `}
            />
        </div>
    )
}

export default Input;