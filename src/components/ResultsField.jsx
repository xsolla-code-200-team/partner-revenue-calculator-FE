import React from 'react';

import styles from '../scss/styles.scss';
import ResultsForm from './ResultsForm';
// import ProgressBar from './ProgressBar';

const ResultsField = ({ TotalRevenue, RevenuePerMonth, isSent, Error, ...props }) => (
    <>
        {/* <div className={styles.appMainPartResult}>
            <div className={styles.appMainPartResultForm}>
                <div className={styles.appMainPartResultFormView}>
                    <div className={styles.appMainPartResultFormViewForm}>
                        {!isSent && <ProgressBar Error={Error} />}
                        {isSent && <ResultsForm TotalRevenue={TotalRevenue} RevenuePerMonth={RevenuePerMonth} />}
                    </div>
                </div>
            </div>
        </div> */}
    </>
);

export default ResultsField;
