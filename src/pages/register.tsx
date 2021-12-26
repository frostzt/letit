import React from 'react';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Button, Box } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import InputField from '../components/InputField/InputField';

import { mapErrors } from '../utils/mapErrors';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const RegisterPage: React.FC<{}> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Register - Letit</title>
      </Head>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ data: values });
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
                <InputField name="username" placeholder="Create an username" label="Username" />
              </Box>
              <Box mb={2}>
                <InputField name="email" placeholder="Enter an email" label="Email" type="email" />
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

export default withUrqlClient(createUrqlClient)(RegisterPage);
