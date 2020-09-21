import React, { useState, useEffect, useRef } from 'react';

import styles from '../scss/styles.scss';
import ResultsForm from './ResultsForm';
// import ProgressBar from './ProgressBar';

const ResultsField = ({ Error, id, ...props }) => {
  const [dataInfo, setDataInfo] = useState({});
  const [errorName, setErrorName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      getResponse();
    }
    // console.log(`произошел рендер результата, id = ${id}`);
    // formValidation();
  }, [dataInfo]);

  const getResponse = () => {
    setIsReadyToShow(false);
    fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('data from id:');
        console.log(data);
        setDataInfo(data);
        setIsReadyToShow(true);
      })
      .catch((e) => {
        console.log(e.message);
        setErrorName(e.message);
        setHasError(true);
      });
  };

  return (
    <>
      <div className={styles.appMainPartResult}>
        <div className={styles.appMainPartResultForm}>
          <div className={styles.appMainPartResultFormView}>
            <div className={styles.appMainPartResultFormViewForm}>
              {isReadyToShow && <ResultsForm TotalRevenue={dataInfo.totalRevenue} RevenuePerMonth={dataInfo.revenuePerMonth} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsField;
