import React, { Component } from 'react';
import JSONP from 'jsonp';
import { Typeahead } from 'react-typeahead';
import './style.scss';
import { GOOGLE_AUTOSUGGESTION_URL } from './constant';

class YoutubeSearchInput extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  handleSearchChange(event) {
    const self = this;
    const query = event.target.value;
    const url = `${GOOGLE_AUTOSUGGESTION_URL}${query}`;
    this.props.handleSearchInputChange(query);
    JSONP(url, function(error, data) {
      if (error) {
        console.log(error);
      } else {
        const searchResults = data[1];
        self.setState({
          options: searchResults.map(([title, ...other]) => title),
        });
      }
    });
  }

  handleOptionSelected(title) {
    this.props.handleSearchInputChange(title);
  }

  render() {
    return (
      <div id="youtube-search" className="w-full">
        <Typeahead
          options={this.state.options}
          maxVisible={10}
          defaultClassNames={false}
          onChange={this.handleSearchChange}
          placeholder={
            'Search Youtube / Type a Youtube Song Url / Type a Youtube Playlist Url'
          }
          className={'w-full'}
          onKeyDown={this.props.handleKeyDown}
          onOptionSelected={this.handleOptionSelected}
          customClasses={{ hover: 'bg-gray-100' }}
        />
      </div>
    );
  }
}

export default YoutubeSearchInput;
