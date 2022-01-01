import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { InputField } from '../../components/InputField/InputField';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { mapErrors } from '../../utils/mapErrors';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Change Password - Letit</title>
      </Head>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match!' });
          } else {
            const response = await changePassword({
              newPassword: values.password,
              token: typeof router.query.token === 'string' ? router.query.token : '',
            });
            if (response.data?.changePassword.errors) {
              const erroMap = mapErrors(response.data.changePassword.errors);
              if ('token' in erroMap) {
                toast.error(erroMap.token);
              }
              setErrors(erroMap);
            } else {
              toast.success('Password changed successfully, please login!');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={2}>
                <InputField
                  name="password"
                  placeholder="Enter your new password"
                  label="New Password"
                  type="password"
                />
              </Box>
              <Box mb={4}>
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  label="Confirm Password"
                />
              </Box>
              <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
                Reset your password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);