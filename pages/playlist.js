import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import Layout from '../components/Layout';
import Playlist from '../containers/Playlist';

const GET_PLAYLIST = gql`
  query($listId: String!) {
    playlist(listId: $listId) {
      owner {
        name
      }
      name
      des
    }
  }
`;

const PlaylistPage = ({ metaData }) => (
  <ApolloConsumer>
    {client => (
      <Layout>
        <Playlist client={client} metaData={metaData} />
      </Layout>
    )}
  </ApolloConsumer>
);

PlaylistPage.getInitialProps = async ({ query, apolloClient }) => {
  const { data } = await apolloClient.query({
    query: GET_PLAYLIST,
    variables: { listId: query.listId },
  });
  const { owner, name: playlistName, des: playlistDes } = data.playlist;
  const { name: ownerName } = owner;

  return {
    metaData: { playlistName, playlistDes, ownerName },
    namespacesRequired: [],
  };
};

export default PlaylistPage;
