import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Profile from '../containers/Profile';

const ProfilePage = props => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Profile client={client} />
      </Layout>
    )}
  </ApolloConsumer>
);

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default ProfilePage;
