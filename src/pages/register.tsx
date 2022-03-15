import NextLink from 'next/link';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FormikInputField } from '../ui/FormikInputField';
import Wrapper from '../components/Layout/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { mapErrors } from '../utils/mapErrors';
import { withApollo } from '../utils/withApollo';
import Layout from '../components/Layout/Layout';

const RegisterPage: React.FC<{}> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Layout>
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
              <div>
                <div className="mb-2">
                  <FormikInputField name="username" placeholder="Create an username" label="Username" />
                </div>
                <div className="mb-2">
                  <FormikInputField name="email" placeholder="Enter an email" label="Email" type="email" />
                </div>
                <div className="mb-4">
                  <FormikInputField name="password" placeholder="Create a password" type="password" label="Password" />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white text-sm py-1.5 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3"
                >
                  Register
                </button>
                <p className="mt-4">
                  Already have an account?{' '}
                  <NextLink href="/login">
                    <p className="inline-block cursor-pointer text-red-500">Login.</p>
                  </NextLink>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(RegisterPage);
