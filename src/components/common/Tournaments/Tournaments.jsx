import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import classes from './Tournaments.module.scss';
import Tournament from './Tournament/Tournament';
import mediaQuery from '../../../constants/style/mediaQueries';
import { getUserId } from '../../../redux/store';

const Tournaments = ({
  openAdditionalInfoMobile, isHorizontalStyle, myTournaments, sendId,
  tournaments, setChosenTournamentId, chosenTournamentId, openAdditionalInfoPopup,
}) => {
  const isTablet = useMediaQuery({ maxDeviceWidth: mediaQuery.tablet });
  const activeTables = useSelector(state => state.activeTables);
  const [ tourTable, setTourTable ] = useState([]);
  const userID = getUserId();

  const sortTables = () => {
    const newArr = [];
    for (const tourValue of tournaments) {
      const isOurTournament = tourValue.players.find(player => player.id === userID);
      if (isOurTournament) {
        newArr.unshift(tourValue);
      } else {
        newArr.push(tourValue);
      }
    }
    return newArr;
  };

  useEffect(() => {
    setTourTable(sortTables());
  }, [ tournaments, activeTables ]);

  const setChosenItem = (id) => {
    if (Object.keys(myTournaments).map(myTournamentId => +myTournamentId).includes(id)) return;
    setChosenTournamentId(id);
    isTablet && openAdditionalInfoMobile();
  };

  return (
    <div className={classNames(
      classes.tournamentsMain,
      { [classes.tournamentsMain_horizontal]: isHorizontalStyle },
    )}>
      <ul className={classes.tournaments}>
        {
          tourTable.map((data) => {
            const isCoincidence = Object.keys(myTournaments).map(id => +id).includes(data.id);
            const chosen = chosenTournamentId === data.id;

            return (
              <li
                key={data.id}
                className={
                  classNames(classes.tournament, {
                    [classes.tournament_active]: chosen || isCoincidence,
                  })}
              >
                <Tournament
                  tournamentData={data}
                  isTablet={isTablet}
                  isActiveItem={isCoincidence}
                  openAdditionalInfoPopup={openAdditionalInfoPopup}
                  openAdditionalInfoMobile={openAdditionalInfoMobile}
                  chosen={chosen}
                  sendId={sendId}
                  setChosenItem={setChosenItem.bind(this, data.id)}
                  isHorizontalStyle={isHorizontalStyle} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Tournaments;
