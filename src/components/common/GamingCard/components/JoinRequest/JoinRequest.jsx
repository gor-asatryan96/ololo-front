import classNames from 'classnames'
import React from 'react'
import { emitJoinRoomRequestApproved, emitJoinRoomRequestDeclined } from '../../../../../api/socket/emitters'
import avatars from '../../../../../assets/images/common/avatars'
import { useLanguageData } from '../../../../../context/LanguageProvider'
import classes from './JoinRequest.module.scss'

const JoinRequest = ({ data = {} }) => {
  const { requestedUser = '123456', hash, requestedUserAvatarId = 1, roomId } = data
  const { t } = useLanguageData()

  const onYes = () => {
    emitJoinRoomRequestApproved({ hash, roomId })
  }

  const onNo = () => {
    emitJoinRoomRequestDeclined({ hash, roomId })
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.userInfo}>
          <div className={classes.avatarWrapper}>
          <img
            className={classes.avatarImg}
            src={avatars[requestedUserAvatarId]}
            alt='user avatar' />
          </div>
          <div className={classes.text}>{`${t['Do you want to play with ID']} ${requestedUser} ?`}</div>
        </div>
        <div className={classes.buttonGroup}>
          <button
            onClick={onYes}
            className={classNames(classes.button, classes.button_green)}
          >
            {t['Yes']}
          </button>
          <button
            onClick={onNo}
            className={classNames(classes.button, classes.button_blue)}
          >
            {t['No']}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinRequest