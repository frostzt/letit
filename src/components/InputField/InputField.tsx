import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & { name: string; label: string };

const InputField: React.FC<InputFieldType> = ({ label, size: _, ...props }) => {
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

export default InputField;
