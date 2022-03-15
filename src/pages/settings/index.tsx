import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { withApollo } from '../../utils/withApollo';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
    </Layout>
  );
};

export default withApollo({ ssr: false })(SettingsPage);
