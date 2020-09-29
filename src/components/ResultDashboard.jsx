import React, { useState, useEffect, useRef } from 'react';
import { Link, animateScroll as scroll, Element, scroller } from 'react-scroll';

import styles from '../scss/styles.scss';
import ForecastChart from './ForecastChart';
// import ProgressBar from './ProgressBar';

const ResultDashboard = ({ inputData, ...props }) => {
  const [resultData, setResultData] = useState(inputData);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    if (resultData.isReady) {
      scroller.scrollTo("result", {
        // spy: true, 
        smooth: true,
        offset: 0,
        duration: 500,
        // delay: 500,
      });
    } else {
      getResponse();
    }
  }, [resultData]);

  const getResponse = () => {
    fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/${resultData.id}`, {
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
        // need to put a delay in ?? seconds
        if (data.isReady) {
          console.log('resData (GET id):');
          console.log(data);
        }
        setResultData(data);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      });
  };

  return (
    <>
      <div className={styles.resultDashboard}>
        <Element name="result"></Element>
        <div className={styles.appMainPartResultForm}>
          <div className={styles.appMainPartResultFormView}>
            <div className={styles.appMainPartResultFormViewForm}>
              {
                resultData.isReady &&
                <ForecastChart
                  TotalRevenue={totalRevenue}
                  chosenForecast={resultData.chosenForecast}
                  anotherForecast={resultData.otherForecasts[0]}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultDashboard;
