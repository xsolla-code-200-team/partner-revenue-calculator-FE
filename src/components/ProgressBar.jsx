import React from 'react';
import { Circle2 } from 'react-preloaders';

import fonts from '../scss/fonts.scss';
import styles from '../scss/styles.scss';
import error from '../pics/error.png';

// const phrases = [
//     'We download your data into database',
//     'Our model make some magic to calculate your revenue',
//     'Finalising our results'
// ]

const ProgressBar = ({
  Error1, Error2, isSent, ...props
}) => (
  <>
    <div className={styles.ProgressBar}>
      <div className={styles.ProgressBarView}>
        <div className={styles.ProgressBarViewAnimation}>
          <Circle2 customLoading={isSent} color="#eb002f" />
        </div>
        <div className={styles.ProgressBarViewText}>
          <img src={error} style={{ width: '500px', height: '500px' }} />
          <p className={fonts.title}>
            Error:
            {' '}
            {Error1 || Error2}
          </p>
        </div>
      </div>
    </div>
  </>
);

export default ProgressBar;
