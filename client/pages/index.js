import React from 'react';

const IndexPage = props => <div>Hello</div>;

IndexPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default IndexPage;
