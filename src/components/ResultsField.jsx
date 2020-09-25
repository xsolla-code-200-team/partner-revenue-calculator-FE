import React, { useState, useEffect, useRef } from 'react';
import { Link, animateScroll as scroll, Element, scroller } from 'react-scroll';

import styles from '../scss/styles.scss';
import ResultsForm from './ResultsForm';
// import ProgressBar from './ProgressBar';

const ResultsField = ({ Error, id, ...props }) => {
  const [dataInfo, setDataInfo] = useState({});
  const [errorName, setErrorName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isReadyToShow, setIsReadyToShow] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const firstRender = useRef(true);
  const scrolled = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      getResponse();
    }
    if (dataInfo.chosenForecast == null) {
      getResponse();
    }
    if (dataInfo.chosenForecast != null) {
      updateTotalRevenue();
      setIsReadyToShow(true);
    }
    if (isReadyToShow) {
      scroller.scrollTo("result", {
        // spy: true, 
        smooth: true,
        offset: 0,
        duration: 500,
        // delay: 500,
      });
    }
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
        console.log('resData (GET id):');
        console.log(data);
        setDataInfo(data);
        // setIsReadyToShow(true);
      })
      .catch((e) => {
        console.log(e.message);
        setErrorName(e.message);
        setHasError(true);
      });
  };

  const updateTotalRevenue = () => {
    if (dataInfo.chosenForecast == null) {
      setTotalRevenue(0);
    } else {
      const value = dataInfo.chosenForecast.forecast.reduce((acc, item) => {
        console.log(item);
        console.log(acc);
        return acc + Number(item);
      }, 0);
      setTotalRevenue(Math.round(value));
    }
  }

  return (
    <>
      <div className={styles.appMainPartResult}>
        <Element name="result"></Element>
        <div className={styles.appMainPartResultForm}>
          <div className={styles.appMainPartResultFormView}>
            <div className={styles.appMainPartResultFormViewForm}>
              {
                isReadyToShow &&
                <ResultsForm
                  TotalRevenue={totalRevenue}
                  chosenForecast={dataInfo.chosenForecast}
                  anotherForecast={dataInfo.otherForecasts[0]}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsField;
