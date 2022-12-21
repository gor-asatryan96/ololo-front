import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { GAME_SCENES } from '../../../../constants/game/ids';

const { WAITING, COMPARISON } = GAME_SCENES;

const CloseGameButton = ({ gameScene, tournamentId, setIsCloseConfirmOpen }) => {

  const isCrossDisabled = ((!tournamentId && gameScene !== COMPARISON)
    || (!!tournamentId && gameScene !== WAITING));

  return (
      <button
              type='button'
              className={classNames(
                classes.gamingCard__fieldButton,
                classes.gamingCard__fieldButton_close,
              )}
              aria-label='close game field'
              onClick={() => setIsCloseConfirmOpen(true)}
              disabled={gameScene === COMPARISON || (tournamentId && gameScene === WAITING)}
            >
              {isCrossDisabled
              && <span className={classes.gamingCard__fieldButtonCloseIcon} />}
      </button>
  )
}

export default CloseGameButton