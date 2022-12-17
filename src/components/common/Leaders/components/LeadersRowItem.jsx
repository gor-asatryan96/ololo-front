import React from 'react';
import classNames from 'classnames';
import classes from '../Leaders.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import avatars from '../../../../assets/images/common/avatars';

const LeadersRowItem = ({
  data, index, lastTicketRef, currentClass, avatarId,
}) => {
  const { t } = useLanguageData();

  return (
    <div
      ref={lastTicketRef}
      className={classNames(
        classes.leaders__column,
        classes.leaders__column_body,
        classes[currentClass],
      )}
      >
      <div
        className={classNames(
          classes.leaders__cell,
          classes.leader__cell_position,
        )}
          >
        {index}
      </div>
      <div
        className={classNames(
          classes.leaders__cell,
          classes.leaders__cell_id,
        )}
          >
        <span className={classes.leaders__user}>
          <img
            src={avatars[avatarId]}
            alt="user avatar"
            className={classes.leader__userImg}
              />
        </span>
        {t['ID']}: {data.remoteId}
      </div>
      <div
        className={classNames(
          classes.leaders__cell,
          classes.leaders__cell_allMatches,
        )}
          >
        {data.playedCash}
      </div>
      <div
        className={classNames(
          classes.leaders__cell,
          classes.leaders__cell_wonMatches,
        )}
          >
        {data.winCash}
      </div>
    </div>
  );
};

export default LeadersRowItem;
