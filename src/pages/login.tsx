import NextLink from 'next/link';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FormikInputField } from '../ui/FormikInputField';
import Wrapper from '../components/Layout/Wrapper';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import Layout from '../components/Layout/Layout';

interface Values {
  usernameOrEmail: string;
  password: string;
}

const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const asyncLogin = async (values: Values) => {
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
  };

  return (
    <Layout>
      <Wrapper variant="small">
        <Head>
          <title>Login - Letit</title>
        </Head>
        <div className="-translate-x-10 md:translate-x-0">
          <Formik initialValues={{ usernameOrEmail: '', password: '' }} onSubmit={async (values) => asyncLogin(values)}>
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <div className="mb-2">
                    <FormikInputField
                      name="usernameOrEmail"
                      placeholder="Enter your username or email"
                      label="Username or Email"
                    />
                  </div>
                  <div className="mb-4">
                    <FormikInputField
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      label="Password"
                    />
                  </div>
                  <div className="flex">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white text-sm py-1 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3 mr-5"
                    >
                      Login
                    </button>
                    <div
                      className="bg-indigo-500 text-white text-sm py-1 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3 cursor-pointer whitespace-nowrap"
                      onClick={() =>
                        asyncLogin({
                          usernameOrEmail: process.env.NEXT_PUBLIC_TEST_EMAIL!,
                          password: process.env.NEXT_PUBLIC_TEST_PWD!,
                        })
                      }
                    >
                      Guest Login
                    </div>
                  </div>
                  <div className="mt-4">
                    Do not have an account?{' '}
                    <NextLink href="/register">
                      <p className="inline-block cursor-pointer text-red-500">Register.</p>
                    </NextLink>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(LoginPage);
