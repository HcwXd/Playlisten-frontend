import { gql } from 'apollo-boost';

const schema = gql`
  type Query {
    searchResult(query: String!): [Song!]
    playlist(listId: String!): Playlist
    user(userId: String!): User
  }

  type Mutation {
    createPlaylist(data: CreatePlaylistInput!): Playlist!
    createUser(data: CreateUserInput): User!
  }

  input CreatePlaylistInput {
    name: String!
    ownerId: String!
    des: String!
    cover: String!
    songs: [CreateSongInput!]
  }

  input CreateUserInput {
    userId: String!
    userName: String!
    avatar: String!
    password: String!
    bio: String!
  }

  input CreateSongInput {
    sourceId: String!
    name: String!
    cover: String!
    duration: String!
  }

  type Playlist {
    id: ID!
    owner: User!
    name: String!
    des: String!
    cover: String!
    createAt: String!
    updateAt: String!
    songs: [Song!]!
  }

  type User {
    id: ID!
    name: String!
    bio: String!
    avatar: String!
  }

  type Song {
    id: ID!
    listId: String!
    sourceId: String!
    name: String!
    cover: String!
    duration: String!
  }
`;
