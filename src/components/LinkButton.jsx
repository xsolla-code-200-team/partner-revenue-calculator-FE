import React from 'react';

import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

export default ({link, text, customStyle, ...props}) => (
    <div className={customStyle}>
        <a
          href={link}
          target="_blank"
        >
          <button type="button" className={styles.button_transition}>
            <span className={fonts.header}>{text}</span>
          </button>
        </a>
    </div>
);
