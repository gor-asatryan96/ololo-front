import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import { GAME_SCENES } from '../../../../constants/game/ids';

const { WAITING } = GAME_SCENES;

const AutoGameButton = ({
  acceptedChoose, isAutoGame, handleAutoGame, autoGameCount, gameScene,
}) => {
  const { t } = useLanguageData();
  return (
    <button
      type='button'
      className={classNames(
        classes.gamingCard__fieldButton,
        classes.gamingCard__fieldButton_autoGame,
        { [classes.gamingCard__fieldButton_on]: isAutoGame },
      )}
      disabled={gameScene === WAITING || acceptedChoose || acceptedChoose === 0}
      onClick={handleAutoGame}
  >
      <span className={classes.gamingCard__fieldButtonAutoGameContainer}>
        {autoGameCount} {t['Autogame']} {!isAutoGame && <span>{t['OFF']}</span>}
        {isAutoGame && <span>{t['ON']}</span>}
      </span>
    </button>
  );
};

export default React.memo(AutoGameButton);
