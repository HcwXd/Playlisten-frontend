import React from 'react';

const Error = () => <div>Error</div>;

// For i18n usage, import the locales language file you need for this page
Error.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default Error;
