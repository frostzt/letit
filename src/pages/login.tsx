import React from 'react';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Button, Box } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import InputField from '../components/InputField/InputField';

import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Login - Letit</title>
      </Head>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            response.data.login.errors.forEach((error) => {
              toast.error(error.message);
            });
          } else if (response.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={2}>
                <InputField
                  name="usernameOrEmail"
                  placeholder="Enter your username or email"
                  label="Username or Email"
                />
              </Box>
              <Box mb={4}>
                <InputField name="password" placeholder="Enter your password" type="password" label="Password" />
              </Box>
              <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(LoginPage);
