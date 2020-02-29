import React, { Component } from 'react';
import { Typeahead } from 'react-typeahead';
import { gql } from 'apollo-boost';

import './style.scss';

const SEARCH_USER = gql`
  query($prefix: String!) {
    searchUser(prefix: $prefix) {
      id
      name
      bio
      avatar
      isFollowing
    }
  }
`;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      hideDropdown: false,
      options: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleOptionSelected = this.handleOptionSelected.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  async searchUser(client, prefix) {
    const { data } = await client.query({
      query: SEARCH_USER,
      variables: { prefix },
    });
    const { searchUser } = data;

    return searchUser;
  }

  closeDropdown() {
    this.setState({ hideDropdown: true });
  }

  showDropdown() {
    this.setState({ hideDropdown: false });
  }

  async handleSearchChange(event) {
    const self = this;
    const query = event.target.value;
    const searchResults = await this.searchUser(this.props.client, query);
    self.setState({
      options: searchResults,
    });
  }

  handleOptionSelected(selectedName) {
    const selectedUser = this.state.options.find(
      ({ name }) => name === selectedName,
    );
    const { id } = selectedUser;
    window.location = `profile?userId=${id}`;
  }

  render() {
    return (
      <div id="search-bar" className="lg:w-64">
        <Typeahead
          options={
            this.state.hideDropdown
              ? []
              : this.state.options.map(({ name }) => name)
          }
          maxVisible={10}
          defaultClassNames={false}
          onChange={this.handleSearchChange}
          onBlur={this.closeDropdown}
          onFocus={this.showDropdown}
          placeholder={'Search User'}
          className={'w-full'}
          onKeyDown={this.props.handleKeyDown}
          onOptionSelected={this.handleOptionSelected}
          customClasses={{ hover: 'bg-gray-100' }}
        />
      </div>
    );
  }
}

export default Search;
