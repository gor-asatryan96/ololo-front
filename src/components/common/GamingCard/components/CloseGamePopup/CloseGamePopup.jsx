import React from 'react'
import GamePopup from '../GamePopup/GamePopup'
import classes from '../../GamingCard.module.scss'
import { useLanguageData } from '../../../../../context/LanguageProvider'
import { emitCloseRoom } from '../../../../../api/socket/emitters'

const CloseGamePopup = ({ close, roomId }) => {
  const { t } = useLanguageData()

  const closeGamingCard = () => {
    emitCloseRoom({ roomId });
  };

  return (
      <GamePopup
        isConfirm
        onNo={close} 
        onYes={closeGamingCard}>
          <div className={classes.gamingPopup__text}>{t['Are you sure you want to leave?']}</div>
        </GamePopup>
  )
}

export default CloseGamePopup