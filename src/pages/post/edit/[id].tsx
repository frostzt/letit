import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { FormikInputField, FormikInputFieldTextArea } from '../../../ui/FormikInputField';
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
        {({ isSubmitting }) => {
          return (
            <Form>
              <div>
                <div className="mb-2">
                  <FormikInputField name="title" placeholder="Enter title" label="Title" />
                </div>
                <div className="mb-4">
                  <FormikInputFieldTextArea rows={15} name="content" placeholder="Describe your post" label="Content" />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white text-sm py-1.5 px-5 mb-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3"
                >
                  Update
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
