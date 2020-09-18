import React, {useState} from 'react';

import styles from '../scss/styles.scss';
import ResultsForm from './ResultsForm';
// import ProgressBar from './ProgressBar';

const ResultsField = ({ isSent, Error, id,...props }) => {
    const [dataInfo,setDataInfo] = useState('');
    fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/${id}`)
        .then((response) => response.json())
        .then((data) => setDataInfo(data));
        // .catch((e) => {
        //         setMessage(e.message);
        //         setGeneralState({ ...generalState, isLoading: false, hasError: true, isClicked: true })
        //     });
    return (
        <>
        <div className={styles.appMainPartResult}>
            <div className={styles.appMainPartResultForm}>
                <div className={styles.appMainPartResultFormView}>
                    <div className={styles.appMainPartResultFormViewForm}>
                        {isSent && <ResultsForm TotalRevenue={dataInfo.totalRevenue} RevenuePerMonth={dataInfo.revenuePerMonth} />}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default ResultsField;
