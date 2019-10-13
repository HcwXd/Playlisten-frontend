import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Playlist from '../containers/Playlist';

const SignupPage = props => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Playlist client={client} />
      </Layout>
    )}
  </ApolloConsumer>
);

SignupPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default SignupPage;
