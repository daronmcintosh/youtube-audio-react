import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addToQueue, play, playNext } from '../redux/actions';

import Error from './Error';

const HomeWrapper = styled.div`
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

const CountryTrendingVideosTitle = styled.div`
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

const TrendingVideosWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`;

const TrendingVideo = styled.div`
  width: 350px;
  height: 200px;
  margin-bottom: 70px;
  cursor: pointer;

  @media only screen and (min-width: 600px) {
    margin-right: 10px;
    width: 250px;
    height: 140px;
  }

  @media only screen and (min-width: 768px) {
    width: 210px;
    height: 120px;
  }
`;

const TrendingVideoImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const TrendingVideoTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

class Home extends Component {
  static propTypes = {
    addToQueueConnect: PropTypes.func.isRequired,
    playConnect: PropTypes.func.isRequired,
    playNextConnect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, error: null, trendingVideos: [] };
    this.addSongToQueue = this.addSongToQueue.bind(this);
    this.playSong = this.playSong.bind(this);
    this.playSongNext = this.playSongNext.bind(this);
  }

  componentDidMount() {
    axios
      .get('/trending')
      .then((result) => {
        this.setState({ isLoaded: true, trendingVideos: result.data });
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
      });
  }

  playSong(videoId, title) {
    const { playConnect } = this.props;
    playConnect(videoId, title);
  }

  addSongToQueue(e, data, target) {
    const id = target.firstElementChild.getAttribute('data-videoid');
    const title = target.firstElementChild.getAttribute('data-videotitle');
    const { addToQueueConnect } = this.props;
    addToQueueConnect(id, title);
  }

  playSongNext(e, data, target) {
    const id = target.firstElementChild.getAttribute('data-videoid');
    const title = target.firstElementChild.getAttribute('data-videotitle');
    const { playNextConnect } = this.props;
    playNextConnect(id, title);
  }

  render() {
    const { isLoaded, error, trendingVideos } = this.state;
    if (error) {
      return <Error message={error.message} />;
    }
    if (!isLoaded) {
      return <div>Page is loading</div>;
    }
    return (
      <HomeWrapper className="home-wrapper">
        <CountryTrendingVideosTitle className="country-trending-videos-title">
          United States Trending Videos
        </CountryTrendingVideosTitle>
        <HorizontalRule className="horizantal-rule" />
        <TrendingVideosWrapper className="trending-videos-wrapper">
          {trendingVideos.map(video => (
            <div key={video.id}>
              <ContextMenuTrigger id="Context-Menu">
                <TrendingVideo
                  className="trending-video"
                  data-videoid={video.id}
                  data-videotitle={video.title}
                  onClick={() => this.playSong(video.id, video.title)}
                >
                  <TrendingVideoImg className="trending-video-img" src={video.imgSrc} />
                  <TrendingVideoTitle className="trending-video-title">
                    {video.title}
                  </TrendingVideoTitle>
                </TrendingVideo>
              </ContextMenuTrigger>
            </div>
          ))}
          <ContextMenu id="Context-Menu">
            <MenuItem onClick={this.addSongToQueue}>Add to Queue</MenuItem>
            <MenuItem onClick={this.playSongNext}>Play Next</MenuItem>
          </ContextMenu>
        </TrendingVideosWrapper>
      </HomeWrapper>
    );
  }
}

const mapDispatchToProps = {
  addToQueueConnect: addToQueue,
  playConnect: play,
  playNextConnect: playNext,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
