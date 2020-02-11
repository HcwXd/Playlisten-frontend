import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Likes from '../containers/Likes';

const LikesPage = props => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Likes client={client} />
      </Layout>
    )}
  </ApolloConsumer>
);

LikesPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default LikesPage;
