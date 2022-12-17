import React, {
  useContext, useState, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import useLibSound from 'use-sound';
import { sounds } from '../assets/sounds';

const SoundContext = React.createContext(null);

const SoundProvider = ({ children }) => {
  const [ isSoundActive, setIsSoundActive ] = useState(localStorage.getItem('sound') !== 'false');
  const { currentScene } = useSelector(state => state.globalInfo);
  const { emptyTables } = useSelector(state => state.lobbyInfo);
  const activeTables = useSelector(state => state.activeTables);
  const [ playBackground, backgrondOptions ] = useLibSound(sounds.background, { loop: true });
  const [ playGameStart, gameStartOptions ] = useLibSound(sounds.gameStart, { loop: true });

  const toggleSound = () => {
    setIsSoundActive((prev) => {
      localStorage.setItem('sound', !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (emptyTables.length && isSoundActive) {
      startBackgroundSound();
    }
  }, [ activeTables, currentScene, emptyTables ]);

  useEffect(() => {
    if (!isSoundActive) {
      backgrondOptions.stop();
      gameStartOptions.stop();
    } else if (emptyTables.length) {
      startBackgroundSound();
    }
  }, [ isSoundActive ]);

  const startBackgroundSound = () => {
    if (!Object.keys(activeTables).length) {
      if (!backgrondOptions.isPlaying) {
        gameStartOptions.stop();
        playBackground();
      }
    } else if (!gameStartOptions.isPlaying) {
      backgrondOptions.stop();
      playGameStart();
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isSoundActive, toggleSound,
      }}
      >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

export default SoundProvider;
