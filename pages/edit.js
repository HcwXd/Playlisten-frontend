import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import Layout from '../components/Layout';
import Publish from '../containers/Publish';

const EditPage = props => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Publish client={client} />
      </Layout>
    )}
  </ApolloConsumer>
);

EditPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default EditPage;
