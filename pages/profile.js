import React from 'react';
import Layout from '../components/Layout';
import Profile from '../containers/Profile';

const ProfilePage = props => (
  <Layout>
    <Profile />
  </Layout>
);

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: [],
});

export default ProfilePage;
