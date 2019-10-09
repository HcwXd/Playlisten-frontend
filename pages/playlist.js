import React from 'react';
import Layout from '../components/Layout';
import Playlist from '../containers/Playlist';

const SignupPage = props => (
  <Layout>
    <Playlist />
  </Layout>
);

SignupPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default SignupPage;
