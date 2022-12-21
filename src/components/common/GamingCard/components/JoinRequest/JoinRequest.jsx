import React from "react";
import {
  emitJoinRoomRequestApproved,
  emitJoinRoomRequestDeclined,
} from "../../../../../api/socket/emitters";
import avatars from "../../../../../assets/images/common/avatars";
import { useLanguageData } from "../../../../../context/LanguageProvider";
import GamePopup from "../GamePopup/GamePopup";
import classes from "./JoinRequest.module.scss";

const JoinRequest = ({ data = {} }) => {
  const {
    requestedUser = "",
    hash,
    requestedUserAvatarId = '',
    roomId,
  } = data;
  const { t } = useLanguageData();

  const onYes = () => {
    emitJoinRoomRequestApproved({ hash, roomId });
  };

  const onNo = () => {
    emitJoinRoomRequestDeclined({ hash, roomId });
  };

  return (
    <GamePopup isConfirm onYes={onYes} onNo={onNo}>
      <div className={classes.root}>

      <div className={classes.avatarWrapper}>
        <img
          className={classes.avatarImg}
          src={avatars[requestedUserAvatarId]}
          alt="user avatar"
        />
      </div>
      <div
        className={classes.text}
      >{`${t["Do you want to play with ID"]} ${requestedUser} ?`}</div>
      </div>
    </GamePopup>
  );
};

export default JoinRequest;
