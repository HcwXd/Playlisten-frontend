/* eslint-disable no-underscore-dangle */
/**
 * Genreal propose:_app.js in NEXT.js is for customized initial process of pages
 * We using next-redux-wrapper to insert redux stores for our app
 *
 * @since 2018.12
 */

import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
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
            <Head>
              <title>Playlisten</title>
            </Head>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRedux(generateStore)(appWithTranslation(PlaylistenApp));
