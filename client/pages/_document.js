import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { version } from '../package.json';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, env: process.env.ENV };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="version" data-value={version} />

          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

          {/* Global css settings */}
          <style jsx global>{``}</style>
        </Head>

        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
