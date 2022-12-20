import React, { useState } from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { GAME_SCENES } from '../../../../constants/game/ids';
import { emitCloseRoom } from '../../../../api/socket/emitters';
import ConfirmPopup from '../../ConfirmPopup/ConfirmPopup';

const { WAITING, COMPARISON } = GAME_SCENES;

const CloseGameButton = ({ gameScene, tournamentId, roomId }) => {
  const [ isConfirmOpen, setIsConfirmOpen ] = useState(false)

  const closeGamingCard = () => {
    emitCloseRoom({ roomId });
  };

  const isCrossDisabled = ((!tournamentId && gameScene !== COMPARISON)
    || (!!tournamentId && gameScene !== WAITING));

  return (
    <>
      <button
              type='button'
              className={classNames(
                classes.gamingCard__fieldButton,
                classes.gamingCard__fieldButton_close,
              )}
              aria-label='close game field'
              onClick={() => setIsConfirmOpen(true)}
              disabled={gameScene === COMPARISON || (tournamentId && gameScene === WAITING)}
            >
              {isCrossDisabled
              && <span className={classes.gamingCard__fieldButtonCloseIcon} />}
      </button>
      {isConfirmOpen && <ConfirmPopup text='Are you sure you want to leave?' onNo={() => setIsConfirmOpen(false)} onYes={closeGamingCard} />}
    </>
  )
}

export default CloseGameButton