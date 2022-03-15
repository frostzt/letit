import { useField } from 'formik';
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
// import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & { name: string; label: string };
type InputFieldTextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string };

export const FormikInputField: React.FC<InputFieldType> = ({ label, type, size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="lg:w-3/5 xl:w-2/4">
      <label id={field.name} htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex mt-1 relative rounded-md shadow-sm items-center">
        <input
          {...field}
          {...props}
          type={type}
          id={field.name}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-1.5 lg:py-2 hd:py-2.5 hd:text-base"
          placeholder={props.placeholder}
        />
        {error && <p className="text-rose-500">{error}</p>}
      </div>
    </div>
  );
};

export const FormikInputFieldTextArea: React.FC<InputFieldTextAreaType> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="lg:w-3/5 xl:w-2/4">
      <label id={field.name} htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex mt-1 relative rounded-md shadow-sm items-center">
        <textarea
          {...field}
          {...props}
          id={field.name}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-1.5 lg:py-2 hd:py-2.5 hd:text-base"
          placeholder={props.placeholder}
        />
        {error && <p className="text-rose-500">{error}</p>}
      </div>
    </div>
  );
};
