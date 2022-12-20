import React from 'react'
import HowToPlay from '../../common/HowToPlay/HowToPlay'
import { Popup } from '../../UI'

const HowToPlayPopup = ({ close }) => {
  return (
    <Popup title='How to Play' close={close}>
      <HowToPlay />
    </Popup>
  )
}

export default HowToPlayPopup