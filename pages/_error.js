import React from 'react';

const Error = ({ statusCode }) => (
  <div className="w-screen h-screen flex justify-around items-center text-4xl">
    {statusCode === 404 ? (
      <div>
        <div>{`There's NOTHING here ...`}</div>
        <div className="text-xl">{`... maybe the page you're looking for is gone or never existed`}</div>
      </div>
    ) : (
      `Sorry! Here's a ${statusCode} error 😅`
    )}
  </div>
);

// For i18n usage, import the locales language file you need for this page
Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, namespacesRequired: [] };
};

export default Error;
