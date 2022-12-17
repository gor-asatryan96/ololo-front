import React from 'react';
import classes from '../Home/Home.module.scss';
import jackpot from '../../../assets/images/common/background/ololo-jackpot@2x.png';

const Slider = () => (<img className={classes.jackpot} src={jackpot} alt="jackpot background" draggable={false} />);

export default Slider;
