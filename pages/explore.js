import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Explore from '../containers/Explore';

const ExplorePage = props => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Explore client={client} />
      </Layout>
    )}
  </ApolloConsumer>
);

ExplorePage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default ExplorePage;
