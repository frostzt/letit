import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useFullUserQuery } from '../generated/graphql';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { withApollo } from '../utils/withApollo';

const Me: NextPage<{}> = () => {
  const { data } = useFullUserQuery();
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  useIsAuthenticated();

  useEffect(() => {
    if (data) {
      setEmail(data.me?.email as string);
    }
  }, [data]);

  const onEdit = () => {
    if (isEditing) {
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
          Edit
        </Button>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Me);
