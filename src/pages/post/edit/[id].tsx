import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { InputField, InputFieldTextArea } from '../../../components/InputField/InputField';
import Layout from '../../../components/Layout/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { useGetPostIdFromUrl } from '../../../hooks/useGetPostIdFromUrl';
import { withApollo } from '../../../utils/withApollo';

const EditPost: React.FC<{}> = () => {
  const router = useRouter();
  const postId = useGetPostIdFromUrl();
  const [updatePost] = useUpdatePostMutation();
  const { data, loading } = usePostQuery({ skip: postId === 'undefined', variables: { id: postId } });

  if (loading) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>Cannot find this post</div>
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
          const response = await updatePost({ variables: { id: postId, ...values } });

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
            <div>
              <div className="mb-2">
                <InputField name="title" placeholder="Enter title" label="Title" />
              </div>
              <div className="mb-4">
                <InputFieldTextArea name="content" placeholder="Describe your post" label="Content" />
              </div>
              <button className="mt-4 bg-red-500" type="submit">
                Update Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
