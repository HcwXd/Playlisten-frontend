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

import '../static/common.scss';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/',
  fetch,
});

class PlaylistenApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Head>
              <title></title>
            </Head>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRedux(generateStore)(appWithTranslation(PlaylistenApp));
