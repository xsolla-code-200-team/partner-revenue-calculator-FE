import React from 'react';

import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

export default (props) => (
    <div className={styles.appHeaderButtonsContact}>
        <button
            type="button"
        >
            <a className={fonts.header} href="https://xsolla.com/contact-sales" target="_blank">Contact us</a>
        </button>
    </div>
);
