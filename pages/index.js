import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Router, Link } from '../routes';

const GET_POSTS_FOR_AUTHOR = gql`
  query {
    helloo
  }
`;

const Posts = () => (
  <Query query={GET_POSTS_FOR_AUTHOR}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        Router.push({
          pathname: '/profile',
          query: { userId: 22 },
        });
        return <p>Hello :)</p>;
      }
      console.log(data);

      return (
        <div>
          <ul className="collection">{'Apple'}</ul>
        </div>
      );
    }}
  </Query>
);

const IndexPage = props => (
  <div>
    <Posts />
  </div>
);

IndexPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default IndexPage;
