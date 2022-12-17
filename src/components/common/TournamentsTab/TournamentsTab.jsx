import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import MediaQuery from 'react-responsive';
import { useSelector } from 'react-redux';
import classes from './TournamentsTab.module.scss';
import Pedestal from '../Pedestal/Pedestal';
import Tournaments from '../Tournaments/Tournaments';
import mediaQuery from '../../../constants/style/mediaQueries';
import AdditionalInfo from '../../desktop/AdditionalInfo/AdditionalInfo';
import AdditionalInfoMobile from '../../mobile/AdditionalInfo/AdditionalInfo';
import AdditionalInfoPopup from '../AdditionalInfo/AdditionalInfo';
import TournamentsPlayersList from '../../desktop/TournamentsPlayersList/TournamentsPlayersList';
import GamingTournaments from '../GamingTournament/GamingTournament';
import { emitJoinTournament, emitLeaveTournament } from '../../../api/socket/emitters';
import hourglass from '../../../assets/images/common/icons/hourglass.svg';

const TournamentsTab = () => {
  const [ chosenTournamentId, setChosenTournamentId ] = useState(null);
  const { tournaments, myTournaments, tournamentWinners } = useSelector(
    state => state.tournamentsInfo,
  );

  const activeTables = useSelector(state => state.activeTables);
  const TournamentActiveTables = useMemo(() => (
    Object.values(activeTables).filter(item => item.tournamentId)
  ), [ activeTables ]);

  const chosenTournament = useMemo(() => (
    chosenTournamentId && tournaments.find(item => item.id === chosenTournamentId)
  ), [ chosenTournamentId, tournaments ]);

  const activeTournamentData = useMemo(() => (
    !!Object.keys(myTournaments).length && !!TournamentActiveTables.length
    && Object.keys(myTournaments).map(id => TournamentActiveTables.find(
      item => item.tournamentId === +id,
    ))
  ), [ chosenTournamentId, TournamentActiveTables ]);

  const isActiveTournamentMy = useMemo(() => (
    chosenTournamentId in myTournaments
  ), [ myTournaments, chosenTournamentId ]);

  useEffect(() => {
    setChosenTournamentId(null);
    setIsAdditionalInfoShowMobile(false);
  }, [ TournamentActiveTables.length ]);

  const toggleJoin = useCallback(() => {
    isActiveTournamentMy
      ? emitLeaveTournament({ tournamentId: chosenTournamentId })
      : emitJoinTournament({ tournamentId: chosenTournamentId });
  }, [ isActiveTournamentMy, chosenTournamentId ]);

  const [ isPlayersListShow, setIsPlayersListShow ] = useState(false);
  const [ isAdditionalInfoShowMobile, setIsAdditionalInfoShowMobile ] = useState(false);
  const [ isAdditionalInfoShowDesktop, setIsAdditionalInfoShowDesktop ] = useState(false);
  const [ currentTournamentInfoId, setCurrentTournamentInfoId ] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsAdditionalInfoShowMobile(false);
    else setIsAdditionalInfoShowDesktop(false);
  }, [ TournamentActiveTables ]);

  const openPlayerList = useCallback(() => setIsPlayersListShow(true), []);
  const closePlayerList = useCallback(() => setIsPlayersListShow(false), []);

  const sendId = useMemo(() => (
    Object.values(myTournaments).find(tournament => tournament.id === currentTournamentInfoId)
  ), [ currentTournamentInfoId ]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__cell}>
          <MediaQuery minWidth={mediaQuery.noTablet}>
            <Pedestal
              userList={tournamentWinners}
              isTournaments
              specialPedestal={classes.specialPedestal} />
            <Tournaments
              tournaments={tournaments}
              myTournaments={myTournaments}
              chosenTournamentId={chosenTournamentId}
              sendId={setCurrentTournamentInfoId.bind(this)}
              openAdditionalInfoPopup={setIsAdditionalInfoShowDesktop.bind(this, true)}
              setChosenTournamentId={setChosenTournamentId} />
          </MediaQuery>
          <MediaQuery maxWidth={mediaQuery.tablet}>
            {
              !isAdditionalInfoShowMobile && !activeTournamentData // && !chosenTournamentId
              && <>
                <Pedestal
                  userList={tournamentWinners}
                  isTournaments
                  specialPedestal={classes.specialPedestal}
                />
                <Tournaments
                  tournaments={tournaments}
                  myTournaments={myTournaments}
                  chosenTournamentId={chosenTournamentId}
                  sendId={setCurrentTournamentInfoId.bind(this)}
                  setChosenTournamentId={setChosenTournamentId}
                  openAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, true)}
                />
              </>
            }
          </MediaQuery>
        </div>
        <MediaQuery minWidth={mediaQuery.noTablet}>
          <div className={classes.container__cell}>
            {!activeTournamentData.length && !chosenTournament && (
              <div className={classes.noTournament}>
                <img src={hourglass} />
              </div>
            )}
            {!!activeTournamentData.length && !chosenTournament
            && activeTournamentData.map(
              (tournament) => {
                if (!tournament) return null;
                const currentTournament = Object.keys(myTournaments).length
                  && Object.values(myTournaments).find(
                    item => item.id === tournament?.tournamentId,
                  );
                return <>
                  <GamingTournaments
                    roomIdKey={tournament.roomId}
                    roomData={TournamentActiveTables.find(
                      table => table.tournamentId === tournament.tournamentId,
                    )}
                    activeTournament={currentTournament}
                    showInfo={Object.keys(myTournaments).length < 2}
                    openAdditionalInfoPopup={setIsAdditionalInfoShowDesktop.bind(this, true)}
                    closeAdditionalInfoPopup={setIsAdditionalInfoShowDesktop.bind(this, false)}
                    isAdditionalInfoShowDesktop={isAdditionalInfoShowDesktop}
                  />
                  <AdditionalInfoPopup
                    isAdditionalInfo={isAdditionalInfoShowDesktop}
                    closeAdditionalInfo={setIsAdditionalInfoShowDesktop.bind(this, false)}
                    activeTournament={currentTournament}
                  />
                </>;
              },
            )
            }
            {chosenTournament && <>
              {
              !isPlayersListShow
              && <AdditionalInfo
                tournamentsLimit={Object.keys(myTournaments).length === 2}
                chosenTournament={chosenTournament}
                openPlayerList={openPlayerList}
                isActiveTournamentMy={isActiveTournamentMy}
                closeInfo={setChosenTournamentId.bind(this, null)}
                toggleJoin={toggleJoin} />
              }
              {
              isPlayersListShow
              && <TournamentsPlayersList
                players={chosenTournament.players}
                name={chosenTournament.name}
                closePlayerList={closePlayerList} />
              }
              {!activeTournamentData.length && <AdditionalInfoPopup
                isAdditionalInfo={isAdditionalInfoShowDesktop}
                closeAdditionalInfo={setIsAdditionalInfoShowDesktop.bind(this, false)}
                activeTournament={sendId}
              />}
            </>
            }
          </div>
        </MediaQuery>
      </div>
      <MediaQuery maxWidth={mediaQuery.tablet}>
        {
          isAdditionalInfoShowMobile
          && chosenTournament && !activeTournamentData.length
          && <AdditionalInfoMobile
            chosenTournament={chosenTournament}
            closeAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, false)}
            nullifyId={setChosenTournamentId.bind(this, null)}
            isActiveTournamentMy={isActiveTournamentMy}
            toggleJoin={toggleJoin}
          />
         }
        {
          isAdditionalInfoShowMobile && !chosenTournament && !activeTournamentData.length
          && <AdditionalInfoMobile
            fromInfo
            chosenTournament={sendId}
            closeAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, false)}
            nullifyId={setChosenTournamentId.bind(this, null)}
            isActiveTournamentMy={isActiveTournamentMy}
            toggleJoin={toggleJoin}
          />
         }
        {
          isAdditionalInfoShowMobile
          && chosenTournament && activeTournamentData.length
          && <AdditionalInfoMobile
            chosenTournament={chosenTournament}
            closeAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, false)}
            nullifyId={setChosenTournamentId.bind(this, null)}
            isActiveTournamentMy={isActiveTournamentMy}
            toggleJoin={toggleJoin}
          />
        }
        {!!activeTournamentData.length && !chosenTournament
        && activeTournamentData.map(
          (tournament) => {
            if (!tournament) return null;
            const currentTournament = Object.keys(myTournaments).length
              && Object.values(myTournaments).find(
                item => item.id === tournament?.tournamentId,
              );
            return <>
              {
                !isAdditionalInfoShowMobile
                && <GamingTournaments
                  roomData={TournamentActiveTables.find(
                    table => table.tournamentId === tournament.tournamentId,
                  )}
                  activeTournament={currentTournament}
                  sendId={setCurrentTournamentInfoId.bind(this)}
                  showInfo={Object.keys(myTournaments).length < 2}
                  openAdditionalInfoPopup={setIsAdditionalInfoShowMobile.bind(this, true)}
              />
              }
              {
                isAdditionalInfoShowMobile && tournament.tournamentId === currentTournamentInfoId
                && <AdditionalInfoMobile
                  fromInfo
                  chosenTournament={currentTournament}
                  closeAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, false)}
                  nullifyId={setChosenTournamentId.bind(this, null)}
                  isActiveTournamentMy={isActiveTournamentMy}
                  toggleJoin={toggleJoin}
                />
              }
            </>;
          },
        )}
        {
          !!activeTournamentData.length
          && TournamentActiveTables.length < 2
          && !chosenTournament
          && !isAdditionalInfoShowMobile
          && <Tournaments
            tournaments={tournaments}
            myTournaments={myTournaments}
            chosenTournamentId={chosenTournamentId}
            sendId={setCurrentTournamentInfoId.bind(this)}
            setChosenTournamentId={setChosenTournamentId}
            openAdditionalInfoMobile={setIsAdditionalInfoShowMobile.bind(this, true)}
            isHorizontalStyle />
        }
      </MediaQuery>
    </>
  );
};

export default TournamentsTab;
