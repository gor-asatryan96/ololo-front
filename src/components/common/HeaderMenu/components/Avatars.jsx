import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import avatars from '../../../../assets/images/common/avatars';
import AvatarItem from './AvatarItem';
import classes from '../HeaderMenu.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';

const Avatars = () => {
  const { t } = useLanguageData();
  const avatarId = useSelector(state => state.userInfo.avatarId);
  const avatarArr = Object.keys(avatars);
  const avatarPageCount = Math.ceil(avatarArr.length / 9);
  const [ avatarPage, setAvatarPage ] = useState(1);

  const pageHandler = (isNext) => {
    if (isNext) {
      avatarPage === 1 ? setAvatarPage(avatarPageCount) : setAvatarPage(prev => prev - 1);
    } else {
      avatarPage === avatarPageCount ? setAvatarPage(1) : setAvatarPage(prev => prev + 1);
    }
  };

  return (
    <div className={classes.avatars}>
      <div className={classNames('headerMenuTitle', classes.avatars__title)}>{t['Avatars']}</div>
      <div className={classes.avatars__inner}>
        <button
          className={
          classNames(classes.avatars__buttonSlide, classes.avatars__buttonSlide_previous)
        }
          onClick={pageHandler}
          aria-label='previous page' />
        <ul className={classes.avatars__list}>
          {
          avatarArr
            .map(avatar => (((avatarPage - 1) * 9 < avatar && avatar <= avatarPage * 9)
              && (<AvatarItem
                activeAvatar={avatarId}
                key={avatar}
                avatar={avatar}
              />)
            ))
        }
        </ul>
        <button
          className={
          classNames(classes.avatars__buttonSlide, classes.avatars__buttonSlide_next)
        }
          onClick={() => pageHandler(true)}
          aria-label='next page' />
      </div>
      <ul className={classes.avatars__paginationList}>
        {
        new Array(avatarPageCount)
          .fill(1)
          .map((_, index) => (
            <li key={index} className={classes.avatars__paginationItem}>
              <button
                onClick={() => setAvatarPage(index + 1)}
                type='button'
                className={classNames(
                  classes.avatars__paginationButton,
                  (avatarPage === index + 1) && classes.avatars__paginationButton_active,
                )}
                aria-label={`page ${index + 1}`} />
            </li>
          ))
      }
      </ul>
    </div>
  );
};

export default Avatars;
