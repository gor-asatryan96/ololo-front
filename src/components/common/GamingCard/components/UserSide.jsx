import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import avatars from '../../../../assets/images/common/avatars';

const UserSide = ({ avatarId, remoteId }) => {
  const { t } = useLanguageData();
  return (
    <div className={classNames(classes.gamingCard__user, classes.gamingCard__user_you)}>
      <img
        src={avatars[avatarId]}
        alt='user avatar'
        className={
        classNames(classes.gamingCard__userImg, classes.gamingCard__userImg_gold)} />
      <div className={classes.gamingCard__userInfo}>
        <div className={classes.gamingCard__userPosition}>{t['You']}</div>
        <div className={classes.gamingCard__userId}>{t['ID']}: {remoteId}</div>
      </div>
    </div>
  );
};

export default React.memo(UserSide);
