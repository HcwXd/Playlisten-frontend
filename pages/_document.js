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
          {/* <meta
            property="og:title"
          content="Playlisten - Share and Discover Music Playlist"></meta> 
          <meta property="og:type" content="website"></meta>
          <meta property="og:url" content="https://playlisten.app/"></meta>
          <meta
            property="og:image"
            content="https://i.imgur.com/kUhacyC.jpg"></meta> */}

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>

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
