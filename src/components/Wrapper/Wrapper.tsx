import React from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVariantType = 'small' | 'regular';

interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box maxW={variant === 'regular' ? '800px' : '400px'} w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
