import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { addToQueue, play, updateNowPlayingTitle } from '../redux/actions';

import Error from './Error';

const ResultsWrapper = styled.div`
  margin: 70px auto 120px auto;

  @media only screen and (min-width: 600px) {
    max-width: 560px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 728px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 952px;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 80%;
  }
`;

const ResultsTitle = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
`;

const HorizontalRule = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
  margin-bottom: 1rem;
`;

const SearchResultsWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const SearchResult = styled.div`
  margin-bottom: 70px;
  cursor: pointer;
`;

const SearchResultImg = styled.img`
  width: 200px;
  height: 150px;
  margin-top: -10px;
  margin-bottom: -15px;
  @media only screen and (min-width: 600px) {
    width: 270px;
    height: 202.5px;
    margin-top: -25px;
    margin-bottom: -30px;
  }

  ${props => props.circular
    && css`
      width: 200px !important;
      height: 200px !important;
      border-radius: 50% !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      @media only screen and (min-width: 600px) {
        width: 250px !important;
        height: 250px !important;
        border-radius: 50% !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
    `};
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  float: left;
`;

const SearchResultInfo = styled.div`
  margin-left: 220px;
  @media only screen and (min-width: 600px) {
    margin-left: 300px;
  }
`;

const SearchResultTitle = styled.div`
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  @media only screen and (min-width: 600px) {
    font-size: 1.25rem;
  }
`;

const SearchResultChannel = styled.div`
  margin-bottom: 0.5rem;
  color: #888;
`;

const SearchResultDescription = styled.div`
  color: #888;
  font-size: small;
  word-wrap: break-word;
  display: none;
  @media only screen and (min-width: 600px) {
    display: block;
  }
`;

class Results extends Component {
  static propTypes = {
    addToQueueConnect: PropTypes.func.isRequired,
    playConnect: PropTypes.func.isRequired,
    updateNowPlayingTitleConnect: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, error: null, searchResults: [] };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.addSongToQueue = this.addSongToQueue.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    axios
      .get(`/results?searchQuery=${searchTerm}`)
      .then((result) => {
        this.setState({ isLoaded: true, searchResults: result.data });
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
      });
  }

  handleLinkClick(videoId, title, kind) {
    // TODO: handle whether the item is a channel, playlist or a video here
    const { playConnect, updateNowPlayingTitleConnect } = this.props;
    if (kind.includes('video')) {
      playConnect(videoId);
      updateNowPlayingTitleConnect(title);
    } else if (kind.includes('playlist')) {
      // playlist
    } else if (kind.includes('channel')) {
      // channel
    }
    // this.props.addToQueue(videoId);
  }

  addSongToQueue(e, data, target) {
    const id = target.firstElementChild.getAttribute('data-videoid');
    const title = target.firstElementChild.getAttribute('data-videotitle');
    const { addToQueueConnect } = this.props;
    addToQueueConnect(id, title);
  }

  render() {
    const { isLoaded, error, searchResults } = this.state;
    if (error) {
      return <Error message={error.message} />;
    }
    if (!isLoaded) {
      return <div>Page is loading</div>;
    }
    return (
      <ResultsWrapper className="results-wrapper">
        <ResultsTitle className="results-title">Results</ResultsTitle>
        <HorizontalRule className="horizontal-rule" />
        <SearchResultsWrapper className="search-results-wrapper">
          {searchResults.map(result => (
            <div key={result.id}>
              <ContextMenuTrigger id="Context-Menu">
                <SearchResult
                  className={`search-result ${result.kind}`}
                  data-videoid={result.id}
                  data-videotitle={result.title}
                  onClick={() => this.handleLinkClick(result.id, result.title, result.kind)}
                >
                  <ImageWrapper className="search-result-img-wrapper">
                    {result.kind.includes('channel') ? (
                      <SearchResultImg className="search-result-img" circular src={result.imgSrc} />
                    ) : (
                      <SearchResultImg className="search-result-img" src={result.imgSrc} />
                    )}
                  </ImageWrapper>
                  <SearchResultInfo className="search-result-info">
                    <SearchResultTitle className="search-result-title">
                      {result.title}
                    </SearchResultTitle>
                    {!result.kind.includes('channel') ? (
                      <SearchResultChannel className="search-result-channelTitle">
                        {result.channelTitle}
                      </SearchResultChannel>
                    ) : null}
                    <SearchResultDescription className="search-result-description">
                      {result.description}
                    </SearchResultDescription>
                  </SearchResultInfo>
                </SearchResult>
              </ContextMenuTrigger>
            </div>
          ))}
          <ContextMenu id="Context-Menu">
            <MenuItem onClick={this.addSongToQueue}>Add to Queue</MenuItem>
          </ContextMenu>
        </SearchResultsWrapper>
      </ResultsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  addToQueueConnect: addToQueue,
  playConnect: play,
  updateNowPlayingTitleConnect: updateNowPlayingTitle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
