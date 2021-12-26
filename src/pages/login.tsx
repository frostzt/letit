import React from 'react';
import Head from 'next/head';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Box } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import InputField from '../components/InputField/InputField';

import { useLoginMutation } from '../generated/graphql';

const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Login - Letit</title>
      </Head>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ data: values });
          if (response.data?.login.errors) {
            console.log(response.data.login.errors);
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
                <InputField name="username" placeholder="Enter your username" label="Username" />
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

export default LoginPage;
