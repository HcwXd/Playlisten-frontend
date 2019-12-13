import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Homepage from '../components/Homepage';

const IndexPage = props => (
  <Layout>
    <Homepage />
  </Layout>
);

IndexPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default IndexPage;
