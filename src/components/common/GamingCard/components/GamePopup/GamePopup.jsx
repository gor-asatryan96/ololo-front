import classNames from 'classnames'
import React, { useState } from 'react'
import { useLanguageData } from '../../../../../context/LanguageProvider'
import classes from './GamePopup.module.scss'

const GamePopup = ({ isConfirm, onYes, onNo, children }) => {
  const { t } = useLanguageData()
  const [ isDisabled, setIsDisabled ] = useState(false)

  const yesHandler = () => {
    onYes?.()
    setIsDisabled(true)
  }

  const noHandler = () => {
    onNo?.()
    setIsDisabled(true)
  }

  return (
    <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.body}>
        {children}
      </div>
      {isConfirm && <div className={classes.buttonGroup}>
        <button
          onClick={yesHandler}
          disabled={isDisabled}
          className={classNames(classes.button, classes.button_green)}
        >
          {t['Yes']}
        </button>
        <button
          onClick={noHandler}
          disabled={isDisabled}
          className={classNames(classes.button, classes.button_blue)}
        >
          {t['No']}
        </button>
      </div>}
    </div>
  </div>
  )
}

export default GamePopup