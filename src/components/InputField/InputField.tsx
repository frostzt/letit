import { useField } from 'formik';
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & { name: string; label: string };
type InputFieldTextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string };

export const InputField: React.FC<InputFieldType> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel id={field.name} htmlFor="name">
        {label}
      </FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputFieldTextArea: React.FC<InputFieldTextAreaType> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel id={field.name} htmlFor="name">
        {label}
      </FormLabel>
      <Textarea {...field} {...props} id={field.name} placeholder={props.placeholder} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
