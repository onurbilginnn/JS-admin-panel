import React from 'react';

import mainLogo from '../../assets/images/logos/Darphane_buyuk.png';
import resLogo from '../../assets/images/logos/Darphane_kucuk.png';

import classes from './Logo.module.css';

const logo = props => {
    let logo = mainLogo;

    if(props.mobile) {
        logo = resLogo;
    }
    
   return (
    <div className={classes.Logo}>
        <img src={logo} alt="Logo"/>
    </div>
   ) 
}

export default logo;