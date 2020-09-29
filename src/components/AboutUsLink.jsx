import React from 'react';

import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

export default (props) => (
    <div className={styles.appHeaderButtonsAbout}>
        <a className={fonts.header} href="https://xsolla.com/about" target="_blank">About us</a>
    </div>
);
