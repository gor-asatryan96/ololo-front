import React, { useEffect } from 'react';
import classNames from 'classnames';
import classes from './GamingCard.module.scss';
import OpponentSide from './components/OpponentSide';
import UserSide from './components/UserSide';
import { useLanguageData } from '../../../context/LanguageProvider';
import { useDispatch } from 'react-redux';
import { removeActiveTable } from '../../../redux/ducks/activeTablesDuck';

const themeClass = {
  green: classes.gamingCard_green,
  blue: classes.gamingCard_blue,
};

const GamingCardWaiting = ({
  theme = 'green', roomData, roomId
}) => {
  const dispatch = useDispatch()
  const { t } = useLanguageData();
  const {
    notifyUser, notifyUserAvatarId, requestedUser, requestedUserAvatarId, isDeclined
  } = roomData;

  useEffect(() => {
    if(isDeclined) {
      const timeoutId = setTimeout(() => {
        dispatch(removeActiveTable(roomId))
      }, 2000)
      return() => clearTimeout(timeoutId)
    }
  }, [isDeclined])

  return (
    <section className={classNames(
      classes.gamingCard,
      themeClass[theme],
    )}>
      <h2 className='visually__hidden'>Game interface</h2>
      <div className={classes.gamingCard__container}>
        <header className={classes.gamingCard__header}>
          <div className={classNames(classes.gamingCard__user, classes.gamingCard__user_me)}>
          <OpponentSide
            opponentRemoteId={notifyUser}
            opponentAvatarId={notifyUserAvatarId} 
          />
          </div>
          <UserSide remoteId={requestedUser} avatarId={requestedUserAvatarId} />

        </header>
        <div className={classes.gamingCard__field}>
         <div className={classNames(classes.gamingCard__waitingDialog, classes.gamingCard__waitingDialog_requested)}>
            {isDeclined 
            ? <span className={classes.declined}>{t['Declined']}</span>
            : <span>{`${t['Waiting for']} ID ${notifyUser}`} <br /> {t['approval to join the game']}</span>
            }
        </div>
        </div>
      </div>
    </section>
  );
};

export default GamingCardWaiting;
