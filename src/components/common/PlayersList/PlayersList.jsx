import React from 'react';
import classNames from 'classnames';
import classes from './PlayersList.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import { getOrdinalPostfix } from '../../../helpers/general';

const PlayersList = ({ players }) => {
  const { t } = useLanguageData();
  const sortedPLayers = players.sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));
  return (
    <div className={classes.players}>
      <ul className={classes.playerList}>
        <li className={classNames(classes.playerItem, classes.playerItem_header)}>
          <span className={classNames(classes.playerItem__cell, classes.playerItem__cell_number)}>
            {t['Number']}
          </span>
          <span className={
              classNames(classes.playerItem__cell, classes.playerItem__cell_playerId)
            }>
            {t['Player ID']}
          </span>
          <span className={classNames(classes.playerItem__cell, classes.playerItem__cell_status)}>
            {t['Status']}
          </span>
        </li>
        {sortedPLayers.map((player, index) => (
          <li
            key={player.id}
            className={classes.playerItem}>
            <span className={classNames(classes.playerItem__cell, classes.playerItem__cell_number)}>
              {index + 1}
            </span>
            <span className={
              classNames(classes.playerItem__cell, classes.playerItem__cell_playerId)
            }>
              {player.remoteId}
            </span>
            <span className={classNames(classes.playerItem__cell, classes.playerItem__cell_status)}>
              {player.position ? `${player.position}${getOrdinalPostfix(player.position)} ${t['Place']}` : '-'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
