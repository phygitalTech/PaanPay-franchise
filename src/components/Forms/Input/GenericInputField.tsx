import React from 'react';

import {useFormContext, RegisterOptions} from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  validation?: RegisterOptions;
  disabled?: boolean;
  classname?: string;
  value?: string | number; // Added value prop for controlled input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
}

const GenericInputField: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  defaultValue,
  validation,
  disabled = false,
  classname = '',
  value,
  onChange,
}) => {
  const {
    register,
    formState: {errors},
    setValue,
  } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    if (type === 'number') {
      setValue(name, Number(value));
    }
  };

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm text-black dark:text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-stroke bg-transparent px-2 py-1 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
        disabled={disabled}
        {...register(name, validation)}
        onChange={handleInputChange} // Handle the number conversion for number types
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default GenericInputField;
