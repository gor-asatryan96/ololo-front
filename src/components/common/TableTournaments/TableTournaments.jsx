import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import classes from './TableTournaments.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import { getUserId } from '../../../redux/store';
import { emitLeaveTournament } from '../../../api/socket/emitters';
import { getOrdinalPostfix } from '../../../helpers/general';

const TableTournaments = ({
  details, users, tournamentId, fromHistory,
}) => {
  const { myTournaments, tournaments } = useSelector(state => state.tournamentsInfo);
  const { t } = useLanguageData();
  const userId = getUserId();
  const leaveTournament = () => {
    emitLeaveTournament({ tournamentId });
  };
  const userObj = users.find(user => user.id === userId);
  const sortedUsers = users.sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));
  const currentTournament = tournaments.find(tournament => tournament.id === tournamentId);

  return (
    <div className={classes.table}>
      <div className={classes.table__header}>
        <div className={classNames(classes.table__row, classes.table__row_header)}>
          {details.map(detail => (
            <div key={detail} className={classes.table__cell}>
              {t[detail]}
            </div>
          ))}
          {!fromHistory && currentTournament.state < 3 && <button
            type='button'
            disabled
            className={classes.table__emptySpace}
          >{t['Unjoin']}</button>}
        </div>
      </div>
      <div className={classes.table__body}>
        {/* choose write id or remote id to detect active row */}
        {
          !fromHistory && myTournaments[tournamentId] && <div
            className={classNames(
              classes.table__row,
              classes.table__row_body,
              classes.table__row_active,
            )}>
            <div className={classes.table__cell}>
              You
            </div>

            <div className={classes.table__cell}>
              {userObj.remoteId}
            </div>

            <div className={classNames(classes.table__cell, classes.table__cell_status)}>
              {userObj.position
                ? <span><span
                    className={classes.table__specialSpan}>
                  {userObj.position}{getOrdinalPostfix(userObj.position)}
                </span> {t['Place']}</span>
                : <span>-</span>
              }
            </div>
              {currentTournament?.state <= 2 && <button
                type='button'
                className={classes.table__specialJoinButton}
                aria-label='join button'
                onClick={leaveTournament}
              >{t['Unjoin']}</button>}
          </div>
        }
        {sortedUsers
          .map((user, index) => {
            if (!fromHistory && user.id === userId) { return null; }
            return (
              <div
                key={user.id}
                className={classNames(
                  classes.table__row,
                  classes.table__row_body,
                  { [classes.table__row_active]: fromHistory && (user.id === userId) },
                )}>
                <div className={classes.table__cell}>
                  {index + 1}
                </div>

                <div className={classes.table__cell}>
                  {user.remoteId}
                </div>

                <div className={classNames(classes.table__cell, classes.table__cell_status)}>
                  {user.position
                    ? <span><span
                        className={classes.table__specialSpan}>{user.position}{getOrdinalPostfix(user.position)}</span> {t['Place']}</span>
                    : <span>-</span>
                  }
                </div>
                {currentTournament?.state <= 2 && <button
                  type='button'
                  disabled
                  className={classes.table__emptySpace}
                >{t['Unjoin']}</button>}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TableTournaments;
