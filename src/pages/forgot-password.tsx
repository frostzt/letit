import Head from 'next/head';
import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { Box, Button } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { InputField } from '../components/InputField/InputField';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPasswordPage: NextPage<{}> = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Head>
        <title>Forgot Password - Letit</title>
      </Head>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={2}>
                <InputField name="email" placeholder="Enter your email" label="Email" />
              </Box>
              <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
                Send verification Email
              </Button>
              {complete && (
                <Box mt={4}>
                  The link to generate a new password should be mailed to the email if there is an account associated
                  with it.
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPasswordPage);
