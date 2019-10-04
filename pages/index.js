import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_POSTS_FOR_AUTHOR = gql`
  query {
    helloo
  }
`;

const Posts = () => (
  <Query query={GET_POSTS_FOR_AUTHOR}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
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
    Hello
    <Posts />
  </div>
);

IndexPage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default IndexPage;
