import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Header.module.scss';
import Nav from '../Nav/Nav';
import mediaQuery from '../../../constants/style/mediaQueries';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import { MAIN_SCENE_NAMES } from '../../../constants/game/names';
import { setMainScene, setSocketChange } from '../../../redux/ducks/globalDuck';
import { useToggle } from '../../../hooks/general/helperHooks';
import { useLanguageData } from '../../../context/LanguageProvider';
import { getMobileOperatingSystem, numWithCommas } from '../../../helpers/general';
import { useSound } from '../../../context/SoundProvider';
import { closeConnection, openConnection } from '../../../api/socket';
import { parseCentrifugeUrl } from '../../../utils/utils';
import HowToPlayPopup from '../../desktop/HowToPlayPopup/HowToPlayPopup';
import { useMobileMode } from '../../../hooks/general/useMobileMode';

const { START } = MAIN_SCENE_NAMES;

const Header = ({ parentStyle, toggleFullScreen }) => {
  const dispatch = useDispatch();
  const [ deviceType, setDeviceType ] = useState('');
  const [ isHowToPlayOpen, setIsHowToPlayOpen ] = useState(false)
  const menuToggle = useToggle(true);
  const { t } = useLanguageData();
  const isMobile = useMobileMode();
  const { toggleSound, isSoundActive } = useSound();
  const { currentScene, currency } = useSelector(
    state => state.globalInfo,
  );
  const { balance } = useSelector(state => state.userInfo);
  const isStartScene = currentScene === START

  useEffect(() => {
    setDeviceType(getMobileOperatingSystem());
  }, []);
  

  const onToggleFullScreen = useCallback(() => {
    if (!toggleFullScreen.active) {
      toggleFullScreen.enter();
    } else {
      toggleFullScreen.exit();
    }
  }, [ toggleFullScreen ]);

  // ____TOCORRECT____
  const handleClickHomeButton = useCallback(() => {
    // dispatch(setSocketChange(true));
    // setTimeout(() => {
    //   dispatch(setSocketChange(false));
    // }, 500);
    if (isStartScene) {
      window.parent.postMessage('OLOLO', '*');
    } else {
      // closeConnection();
      // openConnection(parseCentrifugeUrl(window.process.env.REACT_APP_WS_URL));
      // openConnection(process.env.REACT_APP_WS_URL);
      dispatch(setMainScene(START));
    }
  }, [ currentScene ]);

  return (
    <>
    <header className={classNames(classes.header, parentStyle)}>
      <div className={classes.header__container}>
        <div className={classes.header__left}>
          <button
            type="button"
            className="button button_home header__homeButton"
            aria-label="go to home"
            onClick={handleClickHomeButton}
          />
          <div className={classes.balanceOfMoney}>
            <div className={classes.balanceOfMoney__container}>
              {numWithCommas(balance)}
              <span className={classes.balanceOfMoney__currency}> {currency}</span>
            </div>
          </div>
        </div>
        {!isStartScene && <MediaQuery minWidth={mediaQuery.noTablet}>
          <Nav />
        </MediaQuery>}
        <div className={classes.header__right}>
          <MediaQuery minWidth={mediaQuery.noTablet}>
            <button
              type="button"
              className={`button ${classes.header_howToPlay}`}
              onClick={() => setIsHowToPlayOpen(true)}
            >
              {t['How to Play']}
            </button>
          </MediaQuery>
          <div className={classes.header__mainButtons}>
            <button
              type="button"
              className={`button button_sound${isSoundActive ? '' : '_off'}`}
              aria-label="sound toggle"
              onClick={toggleSound}
            />
            {deviceType !== 'IOS' && <button
              type="button"
              onClick={onToggleFullScreen}
              className={`button
                        ${classNames({
                button_fullScreen: !toggleFullScreen.active,
                button_fullScreenReverse: toggleFullScreen.active,
              })}`}
              aria-label="fullscreen toggle"
            />}
            <button
              type="button"
              onClick={menuToggle[1]}
              className={`button
                        ${classNames(classes.menuButton, {
                button_menu: menuToggle[0],
                button_close: !menuToggle[0],
              })}`}
              aria-label="menu toggle"
            />
            <HeaderMenu menuToggle={menuToggle[0]} />
          </div>
        </div>
      </div>
    </header>
    {!isMobile && isHowToPlayOpen && <HowToPlayPopup close={() => setIsHowToPlayOpen(false)} />}
    </>
  );
};

export default Header;
