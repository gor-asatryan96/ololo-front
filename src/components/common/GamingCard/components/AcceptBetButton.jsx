import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import { GAME_SCENES } from '../../../../constants/game/ids';

const { WAITING, COMPARISON } = GAME_SCENES;

const AcceptBetButton = ({
  activeChoose,
  acceptChoose,
  isAutoGame,
  acceptedChoose,
  choicesClasses,
  gameScene,
  result,
  isDrawing,
}) => {
  const { t } = useLanguageData();

  const clickHandler = () => {
    console.log('acceptedChoose', acceptedChoose);
    if (!isAutoGame && !acceptedChoose) acceptChoose();
  };

  return (
    <button
      type='button'
      className={classNames(
        classes.gamingCard__fieldButton,
        classes.gamingCard__fieldButton_placeBet,
        { [classes.gamingCard__fieldButton_betAccepted]: acceptedChoose },
        { [classes.gamingCard__cursor_default]: isAutoGame },
      )}
      disabled={gameScene === WAITING || !activeChoose || gameScene === COMPARISON}
      onClick={clickHandler}
    >
      <span className={classes.gamingCard__fieldButtonPlaceBetContainer}>
        {!result && <span>
          {!acceptedChoose && !isAutoGame && t['Place bet']}
          {acceptedChoose && !isAutoGame && t['Bet accepted!']}
          {isAutoGame && (acceptedChoose ? t['Auto bet accepted!'] : t['Auto bet'])}
        </span>}
        {result && isDrawing && <span>
          {`${t['Drawing']}!`}
        </span>
        }
        {result && !isDrawing && <span>
          {result === '1' && `${t['Win'].toUpperCase()}!`}
          {result === '2' && `${t['Lost']}`}
          {result === '3' && `${t['Draw']}!`}
        </span>}
      </span>
      {
        gameScene !== COMPARISON
        && <span className={classNames(
          classes.gaminCard__fieldButtonPlaceBetIcon, {
            [choicesClasses[activeChoose]]: activeChoose,
          },
        )} />
      }
    </button>
  );
};

export default React.memo(AcceptBetButton);
