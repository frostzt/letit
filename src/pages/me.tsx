import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { FullUserDocument, FullUserQuery, useFullUserQuery, useUpdateUserMutation } from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { withApollo } from '../utils/withApollo';

const Me: NextPage<{}> = () => {
  const { data } = useFullUserQuery();
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  useIsAuthenticated();

  useEffect(() => {
    if (data) {
      setEmail(data.me?.email as string);
    }
  }, [data]);

  const onEdit = async () => {
    if (isEditing && email !== data?.me?.email) {
      const response = await updateUser({
        variables: {
          data: { email },
        },
        update: (cache, { data }) => {
          cache.writeQuery<FullUserQuery>({
            query: FullUserDocument,
            data: {
              __typename: 'Query',
              me: data?.updateUser.user,
            },
          });
        },
      });

      if (response.data?.updateUser.errors) {
        const errors = response.data.updateUser.errors;
        errors.forEach((err) => {
          toast.error(err.message);
        });
      }

      if (response.data?.updateUser.user) {
        toast.success('Updated successfully!');
      }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Layout>
      <Head>
        <title>{data?.me?.username}&apos;s Profile</title>
      </Head>
      <Box>
        <Heading>My Profile</Heading>
        <Text mt={8} mb={4}>
          Personal Details
        </Text>
        <Box w={450}>
          <article>
            <label htmlFor="me-form-email">Email:</label>
            <Input
              type="email"
              value={email}
              id="me-form-email"
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </article>
        </Box>
        <Button
          backgroundColor="tomato"
          _hover={{ backgroundColor: 'orangered' }}
          color="white"
          mt={6}
          onClick={onEdit}
        >
          {!isEditing ? 'Edit' : 'Update'}
        </Button>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Me);
