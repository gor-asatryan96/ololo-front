import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Welcome.module.scss';
import img from '../../../assets/images/common/background/ololo-wrapper.png';
import { MAIN_SCENE_NAMES } from '../../../constants/game/names';
import { setMainScene, setSocketChange } from '../../../redux/ducks/globalDuck';
import { setBalance } from '../../../redux/ducks/userDuck';
import { useLanguageData } from '../../../context/LanguageProvider';
import { setErrorMessage } from '../../../redux/ducks/errorDuck';
import { errorHandler } from '../../../api/socket/errorHandler';
import { closeConnection, openConnection } from '../../../api/socket';

const { GAME, DEMO } = MAIN_SCENE_NAMES;

function Welcome() {
  const dispatch = useDispatch();
  const { emptyTables } = useSelector(state => state.lobbyInfo);
  const { t } = useLanguageData();

  const onPlayClick = async (whichOne) => {
    if (emptyTables.length) {
      if (whichOne === DEMO) {
        dispatch(setSocketChange(true));
        setTimeout(() => {
          dispatch(setSocketChange(false));
        }, 500);
        closeConnection();
        openConnection(process.env.REACT_APP_WS_URL_DEMO);
        dispatch(setBalance((emptyTables[emptyTables.length - 1].bet) * 5));
      }
      dispatch(setMainScene(whichOne));
    } else {
      dispatch(setErrorMessage(errorHandler.getErrorText(404)));
    }
  };

  return (
    <div className={classes.wrapper}>
      <img className={classes.wrapper__img} src={img} alt='ololo logo' />
      <div className={classes.wrapper__controls}>
        <div
          className={classNames(
            classes.wrapper__button,
            classes.wrapper__button_play,
          )}
          onClick={() => onPlayClick(GAME)}
          aria-label='play game'>
          <span className={classes.wrapper__buttonText}>
            {t['Play']}
          </span>
        </div>
        <div
          className={classNames(classes.wrapper__button, classes.wrapper__button_demo)}
          onClick={() => onPlayClick(DEMO)}
          aria-label='play the game in test mode'>{t['Demo']}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
