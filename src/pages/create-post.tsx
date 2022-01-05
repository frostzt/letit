import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField, InputFieldTextArea } from '../components/InputField/InputField';
import Layout from '../components/Layout/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { mapErrors } from '../utils/mapErrors';
import { withApollo } from '../utils/withApollo';

const CreatePostPage: NextPage<{}> = () => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();

  useIsAuthenticated();

  return (
    <Layout variant="small">
      <Head>
        <title>Create new Post - Letit</title>
      </Head>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({
            variables: { data: values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts:{}' });
            },
          });

          // Handle validation errors
          if (response.data?.createPost.errors) {
            setErrors(mapErrors(response.data.createPost.errors));
          }

          // Route to Home if post created
          if (response.data?.createPost.post) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={2}>
                <InputField name="title" placeholder="Enter title" label="Title" />
              </Box>
              <Box mb={4}>
                <InputFieldTextArea name="content" placeholder="Describe your post" label="Content" />
              </Box>
              <Button mt={4} type="submit" colorScheme="red" isLoading={isSubmitting}>
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePostPage);
