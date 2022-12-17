import React from 'react';
import classNames from 'classnames';
import classes from '../GamingCard.module.scss';
import { GAME_RESULTS } from '../../../../constants/game/ids';
import { getUserId } from '../../../../redux/store';

const { WIN, LOSE } = GAME_RESULTS;

const ResultBanner = ({
  isTournament, result, bet, isDrawing, score,
}) => (
  <>
    {isTournament
      ? <div className={classes.gamingCard__tournamentScore}>
        <span>
          {score && Object.values(score).find(player => player.userId !== getUserId()).score}
        </span>
        <span>
          {score && Object.values(score).find(player => player.userId === getUserId()).score}
        </span>
      </div>
      : <div className={classNames(
        classes.gamingCard__betAmountContainer,
        {
          [classes.gamingCard__betAmountContainer_left]: !isDrawing && result === LOSE,
          [classes.gamingCard__betAmountContainer_right]: !isDrawing && result === WIN,
        },
      )}>{`$${bet}`}
      </div>}
  </>
);

export default React.memo(ResultBanner);
