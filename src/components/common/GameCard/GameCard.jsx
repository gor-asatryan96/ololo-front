import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import classes from './GameCard.module.scss';
import { emitCreateRoom, emitJoinRoom } from '../../../api/socket/emitters';
import avatars from '../../../assets/images/common/avatars';
import { useLanguageData } from '../../../context/LanguageProvider';
import { setErrorMessage } from '../../../redux/ducks/errorDuck';
import { errorHandler } from '../../../api/socket/errorHandler';

const GameCard = ({ isWaiting, tableData }) => {
  const dispatch = useDispatch();
  const userBalance = useSelector(state => state.userInfo.balance);
  const { t } = useLanguageData();
  const {
    id, bet, user, playing,
  } = tableData;
  const onPlayGame = () => {
    if (userBalance < bet) {
      dispatch(setErrorMessage(errorHandler.getErrorText('5')));
      return;
    }
    if (isWaiting) {
      emitJoinRoom({ roomId: id });
    } else {
      emitCreateRoom({ templateId: id });
    }
  };

  return (
    <li className={classNames(
      classes.gameCardItem,
      {
        [classes.gameCardItem_empty]: isWaiting,
        [classes.gameCardItem_waiting]: !isWaiting,
      },
    )}>
      <div className={classes.gameCard}>
        <div className={classes.gameCard__priceStatus}>
          <div className={classes.gameCard__price}>
            <span className={classes.gameCard__priceSymbol}>
              $
            </span>
            {bet}
          </div>
          {isWaiting && (<div className={classes.gameCard__wait}>{t['Wait']}</div>)}
        </div>
        {
          isWaiting
          && <div className={classes.gameCard__idIcon}>
            <img src={avatars[user.avatarId]} alt="user icon" className={classes.gameCard__icon} />
            <span className={classes.gameCard__id}>
              <span className="gameCard__idValue">{t['ID']}: {user.remoteId}</span>
            </span>
          </div>
        }
        {
          !isWaiting
          && <div className={classes.gameCard__arePlaying}>
            <span className={classes.gameCard__arePlayingIcon} />
            {playing} {t['are playing']}
          </div>
        }
      </div>
      <button
        onClick={onPlayGame}
        className={
          classNames(
            classes.gameCard__button,
            { [classes.gameCard__button_green]: isWaiting },
            { [classes.gameCard__button_blue]: !isWaiting },
          )
        }
      >
        {isWaiting ? t['Play'] : t['Join']}
      </button>
    </li>
  );
};

export default GameCard;
