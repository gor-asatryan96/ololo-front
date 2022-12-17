import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import classes from '../HeaderMenu.module.scss';
import avatars from '../../../../assets/images/common/avatars';
import { setAvatar } from '../../../../redux/ducks/userDuck';
import { emitChangeAvatar } from '../../../../api/socket/emitters';

const AvatarItem = ({ avatar, activeAvatar }) => {
  const dispatch = useDispatch();

  const switchAvatar = () => {
    emitChangeAvatar({ avatarId: +avatar });
    dispatch(setAvatar(+avatar));
  };

  return (
    <li className={classes.avatars__item} key={avatar}>
      <button
        type='button'
        className={classNames(
          classes.avatars__itemButton,
          { [classes.avatars__itemButton_active]: +avatar === activeAvatar },
        )}
        onClick={switchAvatar}
        aria-label='change your avatar'>
        <span className={classes.avatars__itemButtonDecor}>
          <img
            className={classes.avatars__itemImg}
            src={avatars[avatar]}
            alt='user avatar' />
        </span>
      </button>
    </li>
  );
};

export default AvatarItem;
