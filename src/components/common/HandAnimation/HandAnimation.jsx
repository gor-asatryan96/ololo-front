import React from 'react';
import classNames from 'classnames';
import classes from './HandAnimation.module.scss';
import { GAME_CHOICES } from '../../../constants/game/ids';

const { ROCK, PAPER, SCISSORS } = GAME_CHOICES;

const selectedAnimation = {
  [PAPER]: classes.gamingCard__hand_paper,
  [SCISSORS]: classes.gamingCard__hand_scissors,
  [ROCK]: classes.gamingCard__hand_rock,
};

const HandAnimation = ({
  isReflect, selected, isInfiniteHand,
}) => (
  <div className={
      classNames(
        classes.gamingCard__hand,
        {
          [classes.gamingCard__hand_reflect]: isReflect,
          [selectedAnimation[selected]]: !isInfiniteHand,
          [classes.gamingCard__hand_infinite]: isInfiniteHand,
        },
      )
    } />
);

export default React.memo(HandAnimation);
