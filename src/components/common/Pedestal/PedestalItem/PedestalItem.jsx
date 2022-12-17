import React from 'react';
import classNames from 'classnames';
import classes from './PedestalItem.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import avatars from '../../../../assets/images/common/avatars';
import { numWithCommas } from '../../../../helpers/general';

const activeClassPedestal = [
  classes.pedestalItem__avatarInner_gold,
  classes.pedestalItem__avatarInner_silver,
  classes.pedestalItem__avatarInner_bronze,
];

const PedestalItem = ({
  user, index, isTournaments,
}) => {
  const { t } = useLanguageData();
  return (
    <div className={classes.pedestalItem}>
      <div className={classes.pedestalItem__avatar}>
        <div className={classNames(
          classes.pedestalItem__avatarInner,
          activeClassPedestal[index],
        )}>
          <img src={avatars[user.avatarId]} alt="user avatar" className={classes.pedestalItem__avatarImg} />
        </div>
      </div>
      <div className={classes.pedestalItem__info}>
        <div className={
          classNames(
            classes.pedestalInfo__infoCell,
            classes.pedestalInfo__infoCell_id,
          )
        }>{t['ID']}: {user.remoteId}</div>
        {/* {
          user.amount
          && <div className={
            classNames(
              classes.pedestalInfo__infoCell,
              classes.pedestalInfo__infoCell_type,
            )
          }>{t['Win']} {user.amount}</div>
        } */}
        <div className={
          classNames(
            classes.pedestalInfo__infoCell,
            classes.pedestalInfo__infoCell_amount,
          )
        }>
          {isTournaments && <>
            <span className={classes.isTournaments}>
              {t['Win'].toUpperCase()}
            </span>
            {numWithCommas(user.amount)}</>
          }
        </div>
      </div>
    </div>
  );
};

export default PedestalItem;
