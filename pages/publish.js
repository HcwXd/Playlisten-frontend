import React from 'react';
import Layout from '../components/Layout';
import Publish from '../containers/Publish';

const PublishPage = props => (
  <Layout>
    <Publish />
  </Layout>
);

PublishPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default PublishPage;
