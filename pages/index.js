import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Router, Link } from '../routes';

class Index extends React.Component {
  componentDidMount() {
    Router.push({
      pathname: '/profile',
      query: { userId: 22 },
    });
  }

  render() {
    return <p>Hello :)</p>;
  }
}

const IndexPage = props => (
  <div>
    <Index />
  </div>
);

IndexPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default IndexPage;
