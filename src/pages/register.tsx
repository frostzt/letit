import React from 'react';
import { useMutation } from 'urql';
import { Form, Formik } from 'formik';
import { Button } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper/Wrapper';
import InputField from '../components/InputField/InputField';

interface RegisterProps {}

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!) {
    register(data: { username: $username, password: $password }) {
      id
      username
      updatedAt
      createdAt
    }
  }
`;

const RegisterPage: React.FC<RegisterProps> = () => {
  const [, register] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => register(values)}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="Create a username" label="Username" />
            <InputField name="password" placeholder="Create a password" type="password" label="Password" />
            <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterPage;
