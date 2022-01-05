import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField/InputField';
import Wrapper from '../components/Wrapper/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { mapErrors } from '../utils/mapErrors';
import { withApollo } from '../utils/withApollo';

const RegisterPage: React.FC<{}> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Register - Letit</title>
      </Head>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { data: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              });
            },
          });
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

export default withApollo({ ssr: false })(RegisterPage);
