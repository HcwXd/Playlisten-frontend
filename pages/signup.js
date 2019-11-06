import React from 'react';
import Signup from '../components/Signup';
import Layout from '../components/Layout';

const SignupPage = props => (
  <Layout>
    <Signup />
  </Layout>
);

SignupPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default SignupPage;
