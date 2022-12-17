import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import classNames from 'classnames';
import classes from './HistoryClassic.module.scss';
import { emitGetHistory } from '../../../../api/socket/emitters';
import HistoryClassicItem from './HistoryClassicItem';
import { useLanguageData } from '../../../../context/LanguageProvider';

const HistoryClassic = ({ isActive, historyData }) => {
  const { t } = useLanguageData();
  const [ offset, setOffset ] = useState(0);

  useEffect(() => {
    emitGetHistory({ offset, limit: 20, type: 0 });
  }, [ offset ]);

  const hasMore = offset < historyData.count;

  const pageObserver = useRef(null);
  const lastTicketRef = useCallback((node) => {
    if (pageObserver.current) pageObserver.current.disconnect();
    pageObserver.current = new IntersectionObserver(([ entry ]) => {
      if (entry.isIntersecting && hasMore) {
        setOffset(prev => prev + 20);
      }
    });
    if (node) {
      pageObserver.current.observe(node);
    }
  }, [ hasMore ]);

  return (
    <div className={classes.history} style={{ display: isActive ? 'flex' : 'none' }}>
      <div className={classNames(classes.history__column, classes.history__column_header)}>
        <div className={classNames(classes.history__cell, classes.history__cell_date)}>
          {t['Date']}
        </div>
        <div className={classNames(classes.history__cell, classes.history__cell_duration)}>
          {t['Duration']}
        </div>
        <div className={classNames(classes.history__cell, classes.history__cell_bet)}>
          {t['Bet']}
        </div>
        <div className={classNames(classes.history__cell, classes.history__cell_status)}>
          {t['Status']}
        </div>
      </div>
      <div className={classes.history__columns}>
        {
          historyData.items.map((item, index) => {
            if (index === historyData.items.length - 1) {
              return <HistoryClassicItem key={index} currentRef={lastTicketRef} item={item} />;
            }
            return <HistoryClassicItem key={index} item={item} />;
          })
        }
      </div>
    </div>
  );
};

export default HistoryClassic;
