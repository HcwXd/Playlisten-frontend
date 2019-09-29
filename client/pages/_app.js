/**
 * Genreal propose:_app.js in NEXT.js is for customized initial process of pages
 * We using next-redux-wrapper to insert redux stores for our app
 *
 * @since 2018.12
 */

import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { appWithTranslation } from '../i18n';
import { generateStore } from '../stores/index';

import '../static/common.scss';

class PlaylistenApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title></title>
          </Head>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(generateStore)(appWithTranslation(PlaylistenApp));
