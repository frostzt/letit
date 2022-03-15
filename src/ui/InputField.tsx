import React from 'react';

interface InputFieldProps {
  label?: string;
  value: string;
  htmlFor: string;
  placeholder?: string;
  disabled?: boolean;
  Icon?: any;
  className?: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  disabled,
  type,
  htmlFor,
  placeholder,
  Icon,
  className,
}) => {
  return (
    <div className={`${className ? className : ''} lg:w-3/5 xl:w-2/4`}>
      {label ? (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <div className="flex mt-1 relative rounded-md shadow-sm items-center">
        <div className="w-4 h-4 ml-2 mr-2">{Icon ? <Icon /> : null}</div>
        <input
          type={type}
          name={htmlFor}
          id={htmlFor}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-1.5 lg:py-2 hd:py-2.5 hd:text-base"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
