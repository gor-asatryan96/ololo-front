import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../../../redux/ducks/globalDuck';

const GameInfo = ({
  isTournament, isTablet, rightTime, bet, disabled,
  currentRound, openAdditionalInfoPopup, sendId, tournamentId, roomData,
}) => {
  const currency = useSelector(selectCurrency)
  
  return(
  <div className={classes.gamingCard__gameInfo}>
    <div className={classes.gamingCard__betAmount}>
      {!isTournament && `${bet} ${currency}`}
      {isTournament && currentRound}
    </div>
    {isTournament && isTablet && <button
      disabled={disabled}
      type="button"
      onClick={() => {
        +roomData.tournamentId === +tournamentId && openAdditionalInfoPopup();
        sendId(tournamentId);
      }}
      className={classes.gamingCard__infoButton}
      aria-label='information game' />}
    <div className={classNames(
      classes.gamingCard__time,
      { [classes.gamingCard__time_right]: isTournament && isTablet },
    )}>{rightTime}</div>
  </div>
)};

export default React.memo(GameInfo);
