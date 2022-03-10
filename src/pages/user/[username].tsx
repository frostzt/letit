import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { withApollo } from '../../utils/withApollo';

const UserProfile: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title></title>
      </Head>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UserProfile);
