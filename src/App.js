import React from 'react';
import './App.scss';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useSelector } from 'react-redux';

import MediaQuery from 'react-responsive';
import PlayDemo from './components/common/PlayDemo/PlayDemo';
import Home from './components/common/Home/Home';
import ErrorPopup from './components/common/Error/Error';
import { MAIN_SCENE_NAMES } from './constants/game/names';
import Header from './components/common/Header/Header';
import { openConnection } from './api/socket';
import mediaQuery from './constants/style/mediaQueries';
import RotateScreen from './components/mobile/RotateScreen/RotateScreen';

const { START } = MAIN_SCENE_NAMES;

// WS connection
// openConnection(process.env.REACT_APP_WS_URL);
openConnection(process.env.REACT_APP_WS_URL);

function App() {
  const handle = useFullScreenHandle();
  const { currentScene = '' } = useSelector(state => state.globalInfo);
  const errorMessage = useSelector(state => state.errorInfo);
  return (
    <FullScreen handle={handle}>
      <MediaQuery maxDeviceWidth={mediaQuery.tablet} orientation={'landscape'}>
        <RotateScreen />
      </MediaQuery>
      <div className="App">
        <Header toggleFullScreen={handle} />
        {currentScene === START ? (
          <PlayDemo toggleFullScreen={handle} />
        ) : (
          <Home toggleFullScreen={handle} />
        )}
        <div className="preload visually-hidden" />
      </div>
      {errorMessage && <ErrorPopup errorMessage={errorMessage} />}
    </FullScreen>
  );
}

export default App;
