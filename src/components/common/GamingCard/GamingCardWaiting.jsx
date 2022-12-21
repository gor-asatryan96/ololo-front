import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./GamingCard.module.scss";
import OpponentSide from "./components/OpponentSide";
import UserSide from "./components/UserSide";
import { useLanguageData } from "../../../context/LanguageProvider";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveTable } from "../../../redux/ducks/activeTablesDuck";
import CloseGamePopup from "./components/CloseGamePopup/CloseGamePopup";
import { emitJoinRoomRequestCancel } from "../../../api/socket/emitters";

const themeClass = {
  green: classes.gamingCard_green,
  blue: classes.gamingCard_blue,
};

const GamingCardWaiting = ({ theme = "green", roomData, roomId }) => {
  const dispatch = useDispatch();
  const { t } = useLanguageData();
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false)
  const { avatarId, remoteId } = useSelector(({ userInfo }) => userInfo);
  const { notifyUser, notifyUserAvatarId, isDeclined, hash } = roomData;

  useEffect(() => {
    if (isDeclined) {
      const timeoutId = setTimeout(() => {
        dispatch(removeActiveTable(roomId));
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isDeclined]);

  const leaveGame = () => {
    emitJoinRoomRequestCancel({ roomId, hash })
  }

  return (
    <section className={classNames(classes.gamingCard, themeClass[theme])}>
      <h2 className="visually__hidden">Game interface</h2>
      <div className={classes.gamingCard__container}>
        <header className={classes.gamingCard__header}>
          <div
            className={classNames(
              classes.gamingCard__user,
              classes.gamingCard__user_me
            )}
          >
            <OpponentSide
              opponentRemoteId={notifyUser}
              opponentAvatarId={notifyUserAvatarId}
            />
          </div>
          <UserSide remoteId={remoteId} avatarId={avatarId} />
        </header>
        <div className={classes.gamingCard__field}>
          <div
            className={classes.gamingCard__waitingDialog}
          >
            {isDeclined ? (
              <span className={classes.declined}>{t["Opponent doesn't want to play"]}</span>
            ) : (
              <span>
                {`${t["Waiting for"]} ID ${notifyUser}`} <br />
                {t["approval to join the game"]}
              </span>
            )}
          </div>
        </div>
        <div className={classes.gamingCard__fieldControl}>
          <button
            type="button"
            className={classNames(
              classes.gamingCard__fieldButton,
              classes.gamingCard__fieldButton_close
            )}
            aria-label="close game field"
            onClick={() => setIsCloseConfirmOpen(true)}
          >
            <span className={classes.gamingCard__fieldButtonCloseIcon} />
          </button>
        </div>
        {isCloseConfirmOpen && <CloseGamePopup close={() => setIsCloseConfirmOpen(false)} roomId={roomId} onYes={leaveGame} />}
      </div>
    </section>
  );
};

export default GamingCardWaiting;
