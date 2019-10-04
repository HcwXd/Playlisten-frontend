import React from 'react';
import Layout from '../components/Layout';
import Publish from '../containers/Publish';

const SignupPage = props => (
  <Layout>
    <Publish />
  </Layout>
);

SignupPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default SignupPage;
