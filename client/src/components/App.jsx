import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faPause,
  faPlay,
  faSearch,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Error from './Error';
import Home from './Home';
import Player from './Player';
import Results from './Results';
import Search from './Search';

// Only these icons will be available for use
library.add(faSearch, faPlay, faPause, faStepBackward, faStepForward, faHome);

const GlobalStyle = createGlobalStyle`
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
    font-family: 'Open Sans', sans-serif;
  }
  .react-contextmenu {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    color: #373a3c;
    font-size: 16px;
    margin: 2px 0 0;
    min-width: 160px;
    outline: none;
    opacity: 0;
    padding: 5px 0;
    pointer-events: none;
    text-align: left;
    transition: opacity 250ms ease !important;
  }

  .react-contextmenu.react-contextmenu--visible {
    opacity: 1;
    pointer-events: auto;
    z-index: 9999;
  }

  .react-contextmenu-item {
    background: 0 0;
    border: 0;
    color: #373a3c;
    cursor: pointer;
    font-weight: 400;
    line-height: 1.5;
    padding: 3px 20px;
    text-align: inherit;
    white-space: nowrap;
  }

  .react-contextmenu-item.react-contextmenu-item--active,
  .react-contextmenu-item.react-contextmenu-item--selected {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    text-decoration: none;
  }

  .react-contextmenu-item.react-contextmenu-item--disabled,
  .react-contextmenu-item.react-contextmenu-item--disabled:hover {
    background-color: transparent;
    border-color: rgba(0,0,0,.15);
    color: #878a8c;
  }

  .react-contextmenu-item--divider {
    border-bottom: 1px solid rgba(0,0,0,.15);
    cursor: inherit;
    margin-bottom: 3px;
    padding: 2px 0;
  }
  .react-contextmenu-item--divider:hover {
    background-color: transparent;
    border-color: rgba(0,0,0,.15);
  }

  .react-contextmenu-item.react-contextmenu-submenu {
    padding: 0;
  }

  .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
  }

  .react-contextmenu-item.react-contextmenu-submenu
    > .react-contextmenu-item:after {
    content: "▶";
    display: inline-block;
    position: absolute;
    right: 7px;
  }
`;

const RouteWrapper = styled.div``;

const AppWrapper = styled.div``;

function App() {
  return (
    <Router className="router">
      <RouteWrapper className="routes-wrapper">
        <GlobalStyle />
        <AppWrapper className="App">
          <Search className="Search" />
          <Player className="Player" />
        </AppWrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/results" component={Results} />
          <Route render={() => <Error message="Page does not Exist" />} />
        </Switch>
      </RouteWrapper>
    </Router>
  );
}

export default App;
