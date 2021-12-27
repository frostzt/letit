import React from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { Box, Button } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';

import { mapErrors } from '../../utils/mapErrors';
import Wrapper from '../../components/Wrapper/Wrapper';
import InputField from '../../components/InputField/InputField';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useChangePasswordMutation } from '../../generated/graphql';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
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
            const response = await changePassword({ newPassword: values.password, token });
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      token: query.token as string,
    },
  };
};
