import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import Layout from '../components/Layout';
import Profile from '../containers/Profile';

const GET_USER = gql`
  query($userId: String!) {
    user(userId: $userId) {
      name
    }
  }
`;

const ProfilePage = ({ metaData }) => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Profile client={client} metaData={metaData} />
      </Layout>
    )}
  </ApolloConsumer>
);

ProfilePage.getInitialProps = async ({ query, apolloClient }) => {
  const { data } = await apolloClient.query({
    query: GET_USER,
    variables: { userId: query.userId },
  });
  const { name: userName } = data.user;

  return {
    metaData: { userName },
    namespacesRequired: [],
  };
};

export default ProfilePage;
