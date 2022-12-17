import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import avatars from '../../../../assets/images/common/avatars';
import { useLanguageData } from '../../../../context/LanguageProvider';

const OpponentSide = ({ opponentAvatarId, opponentRemoteId }) => {
  const { t } = useLanguageData();
  return (
    <>
      <img
        src={avatars[opponentAvatarId]}
        alt='user avatar'
        className={
                    classNames(classes.gamingCard__userImg, classes.gamingCard__userImg_silver)} />
      <div className={classes.gamingCard__userInfo}>
        <div className={classes.gamingCard__userPosition}>{t['Opponent']}</div>
        <div className={classes.gamingCard__userId}>{t['ID']}: {opponentRemoteId}</div>
      </div>
    </>
  );
};

export default React.memo(OpponentSide);
