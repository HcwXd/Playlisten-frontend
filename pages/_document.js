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
          <style jsx global>{`
            body,
            div,
            ul,
            ol,
            li,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            pre,
            form,
            fieldset,
            input,
            textarea,
            p,
            blockquote,
            th,
            td {
              margin: 0;
              padding: 0;
            }
            * {
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              font-weight: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -webkit-text-size-adjust: 100%;
            }
            ul,
            ol,
            li {
              margin: 0;
              padding: 0;
              list-style: none;
            }
            input:focus,
            button:focus,
            textarea:focus {
              outline: none;
            }
            html,
            body {
              height: 100%;
            }
          `}</style>
        </Head>

        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
