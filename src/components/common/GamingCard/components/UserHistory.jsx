import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';

const UserHistory = ({ playerHistory, choicesClasses }) => (
  <div className={classNames(
    classes.gamingCard__history, classes.gamingCard__history_mine,
  )}>
    <ul className={classes.gamingCard__historyList}>
      {
        playerHistory.map((item, index) => {
          const currentClass = choicesClasses[item];
          return (
            <li
              key={index}
              className={classNames(
                classes.gamingCard__historyItem,
                currentClass,
              )} />
          );
        })
      }
    </ul>
  </div>
);

export default React.memo(UserHistory);
