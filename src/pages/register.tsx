import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Button, Box } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import InputField from '../components/InputField/InputField';

import { mapErrors } from '../utils/mapErrors';
import { useRegisterMutation } from '../generated/graphql';

interface RegisterProps {}

const RegisterPage: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(mapErrors(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={2}>
                <InputField name="username" placeholder="Create a username" label="Username" />
              </Box>
              <Box mb={4}>
                <InputField name="password" placeholder="Create a password" type="password" label="Password" />
              </Box>
              <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterPage;
