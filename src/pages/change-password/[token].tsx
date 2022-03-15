import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { FormikInputField } from '../../ui/FormikInputField';
import Wrapper from '../../components/Layout/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { mapErrors } from '../../utils/mapErrors';
import { withApollo } from '../../utils/withApollo';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Change Password - Letit</title>
      </Head>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          // Passwords don't match
          if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match!' });
          } else {
            const response = await changePassword({
              variables: {
                newPassword: values.password,
                token: typeof router.query.token === 'string' ? router.query.token : '',
              },
            });

            // If there are any errors in the response
            if (response.data?.changePassword.errors) {
              const erroMap = mapErrors(response.data.changePassword.errors);
              if ('token' in erroMap) {
                toast.error(erroMap.token);
              }
              setErrors(erroMap);
            } else {
              // Changed successfully
              toast.success('Password changed successfully, please login!');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="mb-2">
                <FormikInputField
                  name="password"
                  placeholder="Enter your new password"
                  label="New Password"
                  type="password"
                />
              </div>
              <div className="mb-4">
                <FormikInputField
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  label="Confirm Password"
                />
              </div>
              <button className="mt-4 bg-red-500" type="submit">
                Reset your password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
