/* eslint-disable no-underscore-dangle */

import React from 'react';
import App, { Container } from 'next/app';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withApollo from 'next-with-apollo';
import { DefaultSeo } from 'next-seo';

import { appWithTranslation } from '../i18n';
import { generateStore } from '../stores/index';
import { initGA, logPageView } from '../utils/generalUtils';

import '../static/common.scss';

const client = new ApolloClient({
  uri: `${process.env.API_URI}/graphql`,
  fetch,
  // This cache solve query an array return duplicate first item
  // Refer to: https://stackoverflow.com/questions/48840223/apollo-duplicates-first-result-to-every-node-in-array-of-edges
  cache: new InMemoryCache({
    dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : null),
  }),
});

class PlaylistenApp extends App {
  componentDidMount() {
    initGA();
    logPageView();
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <DefaultSeo
              title="Playlisten - Share and Discover Music Playlist"
              description=""
              openGraph={{
                type: 'website',
                title: 'Playlisten - Share and Discover Music Playlist',
                images: [
                  {
                    url: 'https://i.imgur.com/kUhacyC.jpg',
                    alt: 'Playlisten',
                  },
                ],
              }}
            />
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRedux(generateStore)(
  appWithTranslation(
    withApollo(({ initialState }) => {
      return new ApolloClient({
        uri: `${process.env.API_URI}/graphql`,
        fetch,
        // This cache solve query an array return duplicate first item
        // Refer to: https://stackoverflow.com/questions/48840223/apollo-duplicates-first-result-to-every-node-in-array-of-edges
        cache: new InMemoryCache({
          dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : null),
        }),
      });
    })(PlaylistenApp),
  ),
);
