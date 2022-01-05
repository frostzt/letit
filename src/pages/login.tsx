import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { InputField } from '../components/InputField/InputField';
import Wrapper from '../components/Wrapper/Wrapper';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Login - Letit</title>
      </Head>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: 'posts:{}' });
            },
          });

          // If errors
          if (response.data?.login.errors) {
            response.data.login.errors.forEach((error) => {
              toast.error(error.message);
            });

            // If successfully fetched the user
          } else if (response.data?.login.user) {
            // If redirection present
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              // Else just redirect to home
              router.push('/');
            }
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

export default withApollo({ ssr: false })(LoginPage);
