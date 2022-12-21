import React from 'react'
import GamePopup from '../GamePopup/GamePopup'
import classes from '../../GamingCard.module.scss'
import { useLanguageData } from '../../../../../context/LanguageProvider'

const CloseGamePopup = ({ close, roomId, onYes }) => {
  const { t } = useLanguageData()

  return (
      <GamePopup
        isConfirm
        onNo={close} 
        onYes={onYes}>
          <div className={classes.gamingPopup__text}>{t['Are you sure you want to leave?']}</div>
        </GamePopup>
  )
}

export default CloseGamePopup