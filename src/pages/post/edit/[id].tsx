import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { InputField, InputFieldTextArea } from '../../../components/InputField/InputField';
import Layout from '../../../components/Layout/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { useGetPostIdFromUrl } from '../../../hooks/useGetPostIdFromUrl';
import { createUrqlClient } from '../../../utils/createUrqlClient';

const EditPost: React.FC<{}> = () => {
  const router = useRouter();
  const postId = useGetPostIdFromUrl();
  const [, updatePost] = useUpdatePostMutation();
  const [{ data, fetching }] = usePostQuery({ pause: postId === 'undefined', variables: { id: postId } });

  if (fetching) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Cannot find this post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Head>
        <title>Edit Post - Letit</title>
      </Head>
      <Formik
        initialValues={{ title: data.post.title, content: data.post.content }}
        onSubmit={async (values) => {
          const response = await updatePost({ id: postId, ...values });

          if (response.data?.updatePost?.errors) {
            response.data.updatePost.errors.forEach((err) => {
              toast.error(err.message);
            });
            return;
          }

          router.push(`/post/${postId}`);
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
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
