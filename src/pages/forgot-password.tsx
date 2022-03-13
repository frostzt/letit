import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import Wrapper from '../components/Wrapper/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const ForgotPasswordPage: NextPage<{}> = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Forgot Password - Letit</title>
      </Head>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="mb-2">
                <InputField name="email" placeholder="Enter your email" label="Email" />
              </div>
              <button className="mt-4 bg-rose-600" type="submit">
                Send verification Email
              </button>
              {complete && (
                <div className="mt-4">
                  The link to generate a new password should be mailed to the email if there is an account associated
                  with it.
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPasswordPage);
