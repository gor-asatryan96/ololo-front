import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import classes from './Tournament.module.scss';
import { useLanguageData } from '../../../../context/LanguageProvider';
import { getDateFromIso } from '../../../../helpers/general';
import { GAME_SCENES } from '../../../../constants/game/ids';

const { COMPARISON } = GAME_SCENES;

const Tournament = ({
  isActiveItem, setChosenItem, isHorizontalStyle, openAdditionalInfoMobile,
  tournamentData, chosen, openAdditionalInfoPopup, sendId, isTablet,
}) => {
  const { t } = useLanguageData();
  const activeTables = useSelector(state => state.activeTables);

  const activeTablesArray = Object.entries(activeTables);

  const gameScenesArray = activeTablesArray.map(item => item[1].gameScene);

  const {
    maxPlayers, startedAt, buyIn, name, id,
  } = tournamentData;

  const { time, day, monthText } = getDateFromIso(startedAt);
  return (
    <div className={classNames(
      classes.tournament,
      {
        [classes.tournament_active]: chosen,
        [classes.tournament_active]: isActiveItem,
        [classes.tournament_horizontal]: isHorizontalStyle,
      },
    )}>
      <div className={classNames(
        classes.tournament__row,
        classes.tournament__row_info,
      )}>
        <div className={classNames(
          classes.tournament__column,
          classes.tournament__column_title,
        )}>{name}
        </div>
        <div className={classNames(
          classes.tournament__column,
          classes.tournament__column_data,
        )}>
          {`${time} | ${day} ${monthText} | ${maxPlayers} ${t['Players']}`}
        </div>
      </div>
      <div className={classNames(
        classes.tournament__row,
        classes.tournament__row_winAmount,
      )}>
        ${buyIn}
      </div>
      <div className={classNames(
        classes.tournament__row,
        classes.tournament__row_joinButton,
      )}>
        {
          isActiveItem && !isHorizontalStyle && <button
            onClick={() => {
              if (isTablet) {
                openAdditionalInfoMobile();
              } else {
                openAdditionalInfoPopup();
              }
              sendId(id);
            }}
            disabled={gameScenesArray.map(item => item === COMPARISON)
              .includes(true)}
            type='button'
            className={classNames(
              classes.tournament__joinButton,
              classes.tournament__joinButton_info,
            )}
            aria-label='join tournament'
          />
         }
        {/* deleted the info button on horizontal mobile tournaments list */}
        {
          <button
            type='button'
            onClick={setChosenItem}
            className={classNames(
              classes.tournament__joinButton,
              classes.tournament__joinButton_marginRight,
              {
                [classes.tournament__joinButton_sum]: !chosen,
                [classes.tournament__joinButton_arrow]: chosen,
                [classes.tournament__joinButton_tick]: isActiveItem,
              },
            )}
            aria-label='join tournament'
         />
        }

      </div>
    </div>
  );
};

export default Tournament;
