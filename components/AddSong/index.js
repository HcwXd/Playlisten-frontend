import React, { Component } from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';

import { STAGE } from '../../containers/Publish/constant';
import SearchIcon from '../../static/imgs/search.svg';
import YoutubeSearchInput from '../YoutubeSearchInput';

const GET_SEARCH_RESULT = gql`
  query($searchQuery: String!) {
    searchResult(query: $searchQuery) {
      sourceId
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
      searchResult: [],
      searchQuery: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.handleRenderSearchResult = this.handleRenderSearchResult.bind(this);
    this.handleClickOnSearchResult = this.handleClickOnSearchResult.bind(this);
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

  handleClickOnSearchResult(e) {
    console.log(e.target.dataset);
  }

  renderSearchResult(searchResult) {
    return (
      <div className="border flex flex-col w-1/2">
        <p className="p-4">Select the song you want to add</p>
        <ul className="flex flex-col w-full">
          {searchResult.map(({ name, sourceId }) => (
            <li
              className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer"
              key={sourceId}
              onClick={this.handleClickOnSearchResult}>
              <div className="p-4" data-id={sourceId}>
                {name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  handleRenderSearchResult() {
    return this.renderSearchResult(this.state.searchResult);
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
            <ApolloConsumer>
              {client => (
                <div
                  className="cursor-pointer p-4 hover:bg-gray-100"
                  onClick={async () => {
                    const { data } = await client.query({
                      query: GET_SEARCH_RESULT,
                      variables: { searchQuery: this.state.searchInput },
                    });

                    const { searchResult } = data;
                    this.setState({ searchResult });
                  }}>
                  <img className="w-full h-full" src={SearchIcon} alt="Cover" />
                </div>
              )}
            </ApolloConsumer>
          </div>
          {this.state.searchResult.length > 0
            ? this.handleRenderSearchResult()
            : null}
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
