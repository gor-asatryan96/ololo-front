import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import classes from '../GamingCard.module.scss';
import { setActiveChoose } from '../../../../redux/ducks/activeTablesDuck';

const PlayChooses = ({
  choices, acceptedChoose, isAutoGame, roomId, activeChoose, choicesClasses,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.gamingCard__chooseItems}>
      {choices.map(value => (
        <button
          key={value}
          type='button'
          disabled={acceptedChoose || isAutoGame}
          onClick={() => {
            dispatch(setActiveChoose({ activeChoose: value, roomId }));
          }}
          className={classNames(
            classes.gamingCard__chooseButton,
            { [classes.gamingCard__chooseButton_active]: activeChoose === value },
            { [classes.gamingCard__cursor_default]: acceptedChoose || isAutoGame },
            choicesClasses[value],
          )}
        />
      ))}
    </div>
  );
};

export default React.memo(PlayChooses);
