import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { FormikInputField, FormikInputFieldTextArea } from '../ui/FormikInputField';
import { mapErrors } from '../utils/mapErrors';
import { withApollo } from '../utils/withApollo';
const Layout = dynamic(() => import('../components/Layout/Layout'));

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
            <div>
              <div className="mb-2">
                <FormikInputField name="title" placeholder="Enter title" label="Title" />
              </div>
              <div className="mb-4">
                <FormikInputFieldTextArea name="content" placeholder="Describe your post" label="Content" />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white text-sm py-1.5 px-5 rounded-sm shadow-lg shadow-indigo-500/50 mt-3"
              >
                Create Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePostPage);
