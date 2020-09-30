import React from 'react';

import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

export default (props) => (
    <div className={styles.publisherAccountButton}>
        <button
            className={styles.button_transition}
            type="button"
        >
            <a className={fonts.header} href="https://publisher.xsolla.com/" target="_blank">Get started</a>
        </button>
    </div>
);
