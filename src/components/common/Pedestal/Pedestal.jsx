import React from 'react';
import classNames from 'classnames';
import classes from './Pedestal.module.scss';
import PedestalItem from './PedestalItem/PedestalItem';

const Pedestal = ({ userList, isTournaments, specialPedestal }) => (
  <div className={classNames(classes.pedestal, specialPedestal)}>
    <ul className={classes.pedestalUsers}>
      {userList.map((user, index) => (
        <li key={user.remoteId} className={classes.pedestalUser}>
          <PedestalItem
            user={user}
            index={index}
            isTournaments={isTournaments}
            />
        </li>
      ))}
    </ul>
  </div>
);

export default Pedestal;
