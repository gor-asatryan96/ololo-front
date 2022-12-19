import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive/src';
import { useDispatch, useSelector } from 'react-redux';
import classes from './GamingCard.module.scss';
import HandAnimation from '../HandAnimation/HandAnimation';
import WinnerBanner from '../WinnerBanner/WinnerBanner';
import mediaQuery from '../../../constants/style/mediaQueries';
import {
  emitAutoBet,
  emitCloseRoom,
  emitGameState,
  emitPlaceBet,
  emitWaitingTimer,
} from '../../../api/socket/emitters';
import { useTimer } from '../../../hooks/general/useTimer';
import { secondsToTime } from '../../../helpers/general';
import { GAME_CHOICES, GAME_SCENES } from '../../../constants/game/ids';
import { setErrorMessage } from '../../../redux/ducks/errorDuck';
import { errorHandler } from '../../../api/socket/errorHandler';
import OpponentSide from './components/OpponentSide';
import Loader from '../Loader/Loader';
import GameInfo from './components/GameInfo';
import UserSide from './components/UserSide';
import OpponentHistory from './components/OpponentHistory';
import UserHistory from './components/UserHistory';
import PlayChooses from './components/PlayChooses';
import ResultBanner from './components/ResultBanner';
import AutoGameButton from './components/AutoGameButton';
import AcceptBetButton from './components/AcceptBetButton';
import { useLanguageData } from '../../../context/LanguageProvider';
import useGamingCardSounds from '../../../hooks/game/useGamingCardSound';
import TournamentWaiting from '../WinnerBanner/TournamentWaiting/TournamentWaiting';

const { ROCK, PAPER, SCISSORS } = GAME_CHOICES;
const { WAITING, COMPARISON, CHOOSE } = GAME_SCENES;

const themeClass = {
  green: classes.gamingCard_green,
  blue: classes.gamingCard_blue,
};

const choicesClasses = {
  [PAPER]: classes.backgroundPaper,
  [SCISSORS]: classes.backgroundScissors,
  [ROCK]: classes.backgroundRock,
};

const choices = [ PAPER, SCISSORS, ROCK ];

const GamingCard = ({
  theme = 'green', isTournament, roomId, roomData, openAdditionalInfoPopup, sendId, activeTournament,
}) => {
  const { t } = useLanguageData();
  const isTablet = useMediaQuery({ query: `(max-width: ${mediaQuery.tablet}px)` });
  const {
    userId,
    avatarId,
    remoteId,
    balance,
  } = useSelector(({ userInfo }) => userInfo);
  const dispatch = useDispatch();
  const {
    gameScene, activeChoose, history: playerHistory, gameId, winAmount,
    timer, bet, isDrawing, isYouWinBannerShow, result, acceptedChoose, isInfiniteHand,
    roundsToPlay, tournamentRound, score, tournamentId, currentRound: playerPosition,
    autoGame: { count: autoGameCount, isActive: isAutoGameActive },
    opponent: {
      history: opponentHistory,
      avatarId: opponentAvatarId,
      currentHand: opponentHand,
      remoteId: opponentRemoteId,
    },
  } = roomData;

  useGamingCardSounds(isDrawing, result, gameId, isYouWinBannerShow);

  const currentRound = tournamentRound <= roundsToPlay
    ? `${tournamentRound}/${roundsToPlay}`
    : `${tournamentRound}/${tournamentRound}`;

  const curTimePlusTimer = useMemo(() => Date.now() + timer, [ timer, playerHistory, gameId ]);

  const [ time, start, stop, reset ] = useTimer(
    curTimePlusTimer,
    1000,
    true,
  );
  // activeChoose jnjel enq  vororvhetev gameActionum artatsa
  useEffect(() => {
    gameScene === WAITING
      && emitWaitingTimer({ roomId });
    gameScene === CHOOSE
      && emitGameState({ roomId });
  }, []);

  useEffect(() => {
    if (timer && gameScene <= CHOOSE) {
      reset(curTimePlusTimer);
      start(curTimePlusTimer);
    }
    return () => stop();
  }, [ gameScene, timer ]);

  const handleAutoGame = () => {
    emitAutoBet({ gameId });
  };

  const acceptChoose = () => {
    if (balance < bet) {
      dispatch(setErrorMessage(errorHandler.getErrorText('5')));
      return;
    }
    emitPlaceBet({ gameId, userId, choice: activeChoose });
  };

  const closeGamingCard = () => {
    emitCloseRoom({ roomId });
  };

  const rightTime = secondsToTime(time);

  const isCrossDisabled = ((!tournamentId && gameScene !== COMPARISON)
    || (!!tournamentId && gameScene !== WAITING));

  return (
    <section className={classNames(
      classes.gamingCard,
      themeClass[theme],
    )}>
      <h2 className='visually__hidden'>Game interface</h2>
      <div className={classes.gamingCard__container}>
        {!(isTournament && gameScene === WAITING)
        && <header className={classes.gamingCard__header}>
          <div className={classNames(classes.gamingCard__user, classes.gamingCard__user_me)}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {gameScene === WAITING
              ? <Loader />
              : <OpponentSide
                  opponentRemoteId={opponentRemoteId}
                  opponentAvatarId={opponentAvatarId} />}
          </div>
          <GameInfo
            roomData={roomData}
            disabled={gameScene === COMPARISON}
            bet={bet}
            roomId={roomId}
            isTournament={isTournament}
            isTablet={isTablet}
            rightTime={rightTime}
            sendId={sendId}
            tournamentId={tournamentId}
            openAdditionalInfoPopup={openAdditionalInfoPopup}
            gameScene={gameScene}
            currentRound={currentRound} />

          <UserSide remoteId={remoteId} avatarId={avatarId} />

        </header>}
        {gameScene === COMPARISON
          ? <div className={
          classNames(classes.gamingCard__field, classes.gamingCard__field_hands)}>
            <ResultBanner
              result={result}
              isTournament={isTournament}
              bet={bet}
              score={score}
              isDrawing={isDrawing} />

            <HandAnimation
              isReflect
              selected={opponentHand}
              result={result}
              roomId={roomId}
              isInfiniteHand={isInfiniteHand}
          />
            <div className={classes.gamingCard__separatorHands} />
            <HandAnimation
              selected={activeChoose}
              roomId={roomId}
              result={result}
              isInfiniteHand={isInfiniteHand}
          />
          </div>
          : <div className={classes.gamingCard__field}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {gameScene === WAITING
              ? isTournament
                ? <TournamentWaiting avatar={avatarId} playerPosition={playerPosition * 2} />
                : <div className={classes.gamingCard__waitingDialog}>
                  {t['Waiting for']} <br /> {t['the Opponent']}
                </div>
              : <>
                <OpponentHistory
                  choicesClasses={choicesClasses}
                  opponentHistory={opponentHistory} />
                <UserHistory
                  playerHistory={playerHistory}
                  choicesClasses={choicesClasses} />

                <PlayChooses
                  choices={choices}
                  activeChoose={activeChoose}
                  isAutoGame={isAutoGameActive}
                  acceptedChoose={acceptedChoose}
                  roomId={roomId}
                  choicesClasses={choicesClasses}
          />
              </>}
          </div>
        }
        {/* hand bet on 2nd screen */}
        <div className={classes.gamingCard__fieldControl}>
          {
            gameScene === COMPARISON
            && <span className={classNames(
              classes.gamingCard__betIcon,
              choicesClasses[activeChoose],
            )} />
          }

          {/* Close button */}
          <button
            type='button'
            className={classNames(
              classes.gamingCard__fieldButton,
              classes.gamingCard__fieldButton_close,
            )}
            aria-label='close game field'
            onClick={closeGamingCard}
            disabled={gameScene === COMPARISON || (tournamentId && gameScene === WAITING)}
          >
            {isCrossDisabled
            && <span className={classes.gamingCard__fieldButtonCloseIcon} />}
          </button>

          {/* <AutoGameButton
            acceptedChoose={acceptedChoose}
            isAutoGame={isAutoGameActive}
            autoGameCount={autoGameCount}
            handleAutoGame={handleAutoGame}
            gameScene={gameScene} /> */}

          <AcceptBetButton
            activeChoose={activeChoose}
            acceptChoose={acceptChoose}
            isAutoGame={isAutoGameActive}
            acceptedChoose={acceptedChoose}
            choicesClasses={choicesClasses}
            gameId={gameId}
            result={result}
            isDrawing={isDrawing}
            gameScene={gameScene} />
        </div>

        <WinnerBanner
          result={result}
          isYouWinBannerShow={isYouWinBannerShow}
          isTournament={isTournament}
          bet={bet}
          winAmount={winAmount}
          userAvatar={avatarId}
          opponentAvatar={opponentAvatarId}
          roomId={roomId}
          currentRound={currentRound}
          score={score}
          playerPosition={playerPosition}
          activeTournament={activeTournament}
        />
      </div>
    </section>
  );
};

export default GamingCard;
