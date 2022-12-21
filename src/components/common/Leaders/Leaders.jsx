import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Leaders.module.scss';
import { useLanguageData } from '../../../context/LanguageProvider';
import LeadersRowItem from './components/LeadersRowItem';
import { emitGetLeaderboard } from '../../../api/socket/emitters';
import { resetLeaders } from '../../../redux/ducks/lobbyDuck';

const Leaders = () => {
  const { t } = useLanguageData();
  const dispatch = useDispatch();

  const [ isMyId, setIsMyId ] = useState(false);
  const { leaderboard, me } = useSelector(
    state => state.lobbyInfo.leaders,
  );
  const { avatarId } = useSelector(state => state.userInfo);

  const pageObserver = useRef(null);
  const lastTicketRef = useCallback((node) => {
    if (pageObserver.current) pageObserver.current.disconnect();
    pageObserver.current = new IntersectionObserver(([ entry ]) => {
      if (entry.isIntersecting) {
        setIsMyId(true);
      } else {
        setIsMyId(false);
      }
    });
    if (node) {
      pageObserver.current.observe(node);
    }
  }, []);

  useEffect(() => {
    emitGetLeaderboard({ offset: 0, limit: 20 });
    return () => dispatch(resetLeaders());
  }, []);

  return (
    <div className={classes.leaders}>
      <div className={classes.leaders__table}>
        <div
          className={classNames(
            classes.leaders__column,
            classes.leaders__column_header,
          )}
        >
          <div
            className={classNames(
              classes.leaders__cell,
              classes.leader__cell_position,
            )}
          />
          <div
            className={classNames(
              classes.leaders__cell,
              classes.leaders__cell_id,
            )}
          >
            {t['Player ID']}
          </div>
          <div
            className={classNames(
              classes.leaders__cell,
              classes.leaders__cell_allMatches,
            )}
          >
            {t['All Matches']}
          </div>
          <div
            className={classNames(
              classes.leaders__cell,
              classes.leaders__cell_wonMatches,
            )}
          >
            {t['Won Matches']}
          </div>
        </div>
        <div className={classes.leaders__columns}>
          {leaderboard.map((item, index) => (
            <LeadersRowItem
              data={item}
              index={index + 1}
              key={item.remoteId}
              currentClass={item.remoteId === me.remoteId ? 'leaders__column_yellow' : ''}
              lastTicketRef={item.remoteId === me.remoteId ? lastTicketRef : null}
              avatarId={item.avatarId}
              />
          ))}
        </div>
        {me.remoteId && leaderboard.length > 13 && <LeadersRowItem
          data={me}
          index={me.position || '-'}
          currentClass={`leaders__column_last${isMyId ? '_end' : ''}`}
          avatarId={avatarId}
          />}
      </div>
    </div>
  );
};

export default Leaders;
