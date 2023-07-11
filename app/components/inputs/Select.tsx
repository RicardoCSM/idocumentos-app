import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  disabled,
  required,
  register,
  errors,
  onChange,
}) => {
  return (
    <div className="w-full relative">
      <label
        className={`
          text-md
          ${errors[id] ? 'text-red-600' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        onChange={onChange}
        className={`
          peer
          w-full
          p-1
          sm:p-2
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
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;