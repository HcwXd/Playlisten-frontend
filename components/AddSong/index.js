/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from '../../utils/generalUtils';

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
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.handleRenderSearchResult = this.handleRenderSearchResult.bind(this);
    this.handleClickOnSearchResult = this.handleClickOnSearchResult.bind(this);
    this.handleDeleteSongFromPlaylist = this.handleDeleteSongFromPlaylist.bind(
      this,
    );
    this.onDragEnd = this.onDragEnd.bind(this);
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
    console.log(e.target.dataset.id);
    const targetSong = this.state.searchResult.find(
      ({ sourceId }) => sourceId === e.target.dataset.id,
    );
    this.props.handleChangePlaylist([...this.props.playlist, targetSong]);
    this.setState({ searchResult: [] });
  }

  handleDeleteSongFromPlaylist(e) {
    const targetSongIdx = this.props.playlist.findIndex(
      ({ sourceId }) => sourceId === e.target.dataset.id,
    );

    const newPlaylist = this.props.playlist.slice();
    newPlaylist.splice(targetSongIdx, 1);
    this.props.handleChangePlaylist(newPlaylist);
  }

  renderSearchResult(searchResult) {
    return (
      <div className="border flex flex-col w-1/2">
        <p className="p-4 shadow">Select the song you want to add</p>
        <ul className="flex flex-col w-full">
          {searchResult.map(({ name, sourceId }) => (
            <li
              className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer"
              key={sourceId}
              onClick={this.handleClickOnSearchResult}
              data-id={sourceId}>
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

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newPlaylist = reorder(
      this.props.playlist,
      result.source.index,
      result.destination.index,
    );
    this.props.handleChangePlaylist(newPlaylist);
  }

  renderCurrentPlaylist() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-4 border flex flex-col w-1/2">
              <p className="p-4 shadow">Current Playlist</p>
              <ul className="flex flex-col w-full">
                {this.props.playlist.map(({ name, sourceId }, index) => (
                  <Draggable
                    key={sourceId}
                    draggableId={sourceId}
                    index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-t border-b flex items-center"
                        key={sourceId}>
                        <div
                          className="p-4 cursor-pointer hover:bg-gray-100"
                          onClick={this.handleDeleteSongFromPlaylist}
                          data-id={sourceId}>
                          X
                        </div>
                        <div>{name}</div>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  async getSearchResult(client) {
    const { data } = await client.query({
      query: GET_SEARCH_RESULT,
      variables: { searchQuery: this.state.searchInput },
    });

    const { searchResult } = data;
    this.setState({ searchResult });
  }

  render() {
    const { playlist } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <div
            id="AddSong"
            className="mt-8 flex items-center justify-around w-full">
            <div className="addSong_container flex flex-col items-center justify-between w-full">
              <div className="search_wrap flex justify-center w-1/2 shadow">
                <YoutubeSearchInput
                  handleSearchInputChange={this.handleSearchInputChange}
                  handleKeyDown={async e => {
                    console.log(e.key);
                    if (e.key === 'Enter') {
                      await this.getSearchResult(client);
                    }
                  }}
                />
                <div
                  className="cursor-pointer p-4 hover:bg-gray-100"
                  onClick={async () => {
                    await this.getSearchResult(client);
                  }}>
                  <img className="w-full h-full" src={SearchIcon} alt="Cover" />
                </div>
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
        )}
      </ApolloConsumer>
    );
  }
}

export default AddSong;
