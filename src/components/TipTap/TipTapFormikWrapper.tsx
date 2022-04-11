import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import TipTap from './TipTap';

type InputFieldType = InputHTMLAttributes<any> & { name: string };

const TipTapFormikWrapper: React.FC<InputFieldType> = ({ ...props }) => {
  const [field, { error }] = useField(props);

  return <TipTap {...field} {...props} name={field.name} content={field.value} />;
};

export default TipTapFormikWrapper;
