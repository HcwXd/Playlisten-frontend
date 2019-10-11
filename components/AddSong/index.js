import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { STAGE } from '../../containers/Publish/constant';
import SearchIcon from '../../static/imgs/search.svg';
import YoutubeSearchInput from '../YoutubeSearchInput';

const GET_SEARCH_RESULT = gql`
  query($searchQuery: String!) {
    searchResult(query: $searchQuery) {
      url
      name
      cover
      duration
      id
    }
  }
`;

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResults: [],
      searchQuery: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearch() {
    this.setState({ searchQuery: this.state.searchInput });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  }

  handleNextStage() {
    this.props.handleChangeStage(STAGE.ADD_IMAGE);
  }

  handleSearchInputChange(query) {
    this.setState({
      searchInput: query,
    });
  }

  renderSearchResults() {
    return (
      <Query
        query={GET_SEARCH_RESULT}
        variables={{ searchQuery: this.state.searchQuery }}>
        {({ loading, error, data, refetch }) => {
          if (error) {
            console.log(error);
            return null;
          }
          if (loading) return null;
          const { searchResult } = data;
          return (
            <div className="border flex flex-col w-1/2">
              <p className="p-4">Select the song you want to add</p>
              <ul className="flex flex-col w-full">
                {searchResult.map(({ name, url }) => (
                  <li
                    className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer"
                    key={url}>
                    <div className="p-4">{name}</div>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }

  renderCurrentPlaylist() {
    return (
      <div className="mt-4 border flex flex-col w-1/2">
        <p className="p-4">Current Playlist</p>
        <ul className="flex flex-col w-full">
          {this.props.playlist.map(({ title, id }) => (
            <li className="border-t border-b flex items-center" key={id}>
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>{title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { playlist } = this.props;
    const { searchQuery } = this.state;
    return (
      <div
        id="AddSong"
        className="mt-8 flex items-center justify-around w-full">
        <div className="addSong_container flex flex-col items-center justify-between w-full">
          <div className="search_wrap flex justify-center w-1/2 shadow">
            <YoutubeSearchInput
              handleSearchInputChange={this.handleSearchInputChange}
              handleKeyDown={this.handleKeyDown}
            />
            <div
              className="cursor-pointer p-4 hover:bg-gray-100"
              onClick={this.handleSearch}>
              <img className="w-full h-full" src={SearchIcon} alt="Cover" />
            </div>
          </div>
          {searchQuery ? this.renderSearchResults() : null}
          {playlist.length > 0 ? this.renderCurrentPlaylist() : null}
          {playlist.length > 0 ? (
            <div
              className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={this.handleNextStage}>
              Next
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddSong;
