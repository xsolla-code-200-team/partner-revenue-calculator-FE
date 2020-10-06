import React, { useState, useEffect, useRef } from 'react';
import { Link, animateScroll as scroll, Element, scroller } from 'react-scroll';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from '../scss/styles.scss';
import ForecastChart from './ForecastChart';
import LinkButton from './LinkButton';
import fonts from '../scss/fonts.scss';
import EmailSendingForm from './EmailSendingForm';
import DashboardCard from './DashboardCard';

const ResultDashboard = ({ inputData, onChangeIsLoading, userData, ...props }) => {
  const [resultData, setResultData] = useState(inputData);
  const [error, setError] = useState('');
  const [genresData, setGenresData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState((
    inputData.isReady ?
    Math.round(inputData.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value)) :
    0
  ));
  const [halfRevenue, setHalfRevenue] = useState(
    inputData.isReady ?
    Math.round(
      inputData.chosenForecast.tendencyForecast[0] +
      inputData.chosenForecast.tendencyForecast[1] +
      inputData.chosenForecast.tendencyForecast[2] +
      inputData.chosenForecast.tendencyForecast[3] +
      inputData.chosenForecast.tendencyForecast[4] +
      inputData.chosenForecast.tendencyForecast[5]
    ) : 0
  )
  const [sumUp, setSumUp] = useState((
    inputData.isReady ? (
      inputData.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value) >
      inputData.otherForecasts[0].tendencyForecast.reduce((acc, value) => acc + value) ?
      'good' : 'bad'
    ) : ''
  ));
  const [topMarket, setTopMarket] = useState('');
  const [isMarketReady, setIsMarketReady] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getGenresAnalytics();
      firstRender.current = false;
    }
    if (resultData.isReady) {
      scroller.scrollTo("result", {
        smooth: true,
        offset: 0,
        duration: 500,
        // delay: 500,
      });
    } else {
      getResponse();
    }
  }, [resultData]);

  const getGenresAnalytics = () => {
    Promise.all(
      [
        ...userData.genres.map(item => fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/StaticAnalytics/${item}`))
      ]
    )
    .then(allResponses => Promise.all(allResponses.map(res => res.json())))
    .then(allResponses => {
      console.log('ALL RESPONSES:');
      console.log(allResponses);
      const outputData = allResponses.map(function(item) {
        const sortedRegions = item.regionsInfo.sort(function(a, b) {
          if (a.revenue > b.revenue) {
            return -1;
          }
          if (a.revenue < b.revenue) {
            return 1;
          }
          return 0;
        });
        console.log({ genre: item.genre, region: sortedRegions[0].region, regionsInfo: sortedRegions });
        return { genre: item.genre, region: sortedRegions[0].region, regionsInfo: sortedRegions };
      });
      console.log(outputData);
      const sortedGenres = outputData.sort(function(a, b) {
        if (a.regionsInfo[0].revenue > b.regionsInfo[0].revenue) {
          return -1;
        }
        if (a.regionsInfo[0].revenue < b.regionsInfo[0].revenue) {
          return 1;
        }
        return 0;
      })
      console.log('REGION:');
      console.log(sortedGenres[0].regionsInfo[0].region);
      setTopMarket(`Region ${sortedGenres[0].regionsInfo[0].region}`);
      setIsMarketReady(true);
      setGenresData(outputData);
    });
  }

  const getResponse = () => {
    setTimeout(() => {
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
          if (data.isReady) {
            onChangeIsLoading(false);
            console.log('resData (GET id):');
            console.log(data);
            setTotalRevenue(Math.round(data.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value)));
            setHalfRevenue(Math.round(
              data.chosenForecast.tendencyForecast[0] +
              data.chosenForecast.tendencyForecast[1] +
              data.chosenForecast.tendencyForecast[2] +
              data.chosenForecast.tendencyForecast[3] +
              data.chosenForecast.tendencyForecast[4] +
              data.chosenForecast.tendencyForecast[5]
            ))
            setSumUp(data.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value) >
              data.otherForecasts[0].tendencyForecast.reduce((acc, value) => acc + value) ?
            'good' : 'bad');
          }
          setResultData(data);
        })
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        })
      }, 500);
  }

  

  const GenresText = () => {
      return (
          <div className={styles.GenresInfo}>
              <div className={styles.ForecastTitle}>
                  <p className={fonts.title}>We have also prepared the analytics for every genre that your game has that includes data on average price and sales in different regions of the world.</p>
              </div>
              {
                  genresData.map((genre) =>
                      <div className={styles.GenresInfo__item}>
                         <div className={styles.GenresInfo__item__title}>
                              <p className={fonts.display}>{genre.genre}</p>
                          </div>
                          <div className={styles.GenresInfo__item__text}>
                            <p className={fonts.display}>
                              Games of this genre are more popular in regions
                              {' '}
                              <Popup on="hover" trigger={<p className={styles.PopupCursor}>{genre.regionsInfo[0].region}</p>} position="top center">
                                <div className={styles.PopupText}>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average game price: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>${Math.round(genre.regionsInfo[0].price)}</p>
                                  </div>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average sales: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>{Math.round(genre.regionsInfo[0].revenue)}</p>
                                  </div>
                                </div>
                              </Popup>
                              ,
                              {' '}
                              <Popup on="hover" trigger={<p className={styles.PopupCursor}>{genre.regionsInfo[1].region}</p>} position="top center">
                                <div className={styles.PopupText}>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average game price: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>${Math.round(genre.regionsInfo[1].price)}</p>
                                  </div>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average sales: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>{Math.round(genre.regionsInfo[1].revenue)}</p>
                                  </div>
                                </div>
                              </Popup>
                              {' '}
                              and
                              {' '}
                              <Popup on="hover" trigger={<p className={styles.PopupCursor}>{genre.regionsInfo[2].region}</p>} position="top center">
                                <div className={styles.PopupText}>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average game price: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>${Math.round(genre.regionsInfo[2].price)}</p>
                                  </div>
                                  <div className={styles.PopupTextLine}>
                                    <p className={fonts.label}>Average sales: </p>
                                    <p className={`${fonts.title2} ${styles.PopupInfo}`}>{Math.round(genre.regionsInfo[2].revenue)}</p>
                                  </div>
                                </div>
                              </Popup>
                              .</p>
                              <p className={fonts.title2}>Explore these opportunities with the help of Xsolla.</p>

                          </div>
                      </div>
                  )
              }
          </div>
      )
  };

  return (
    <>
      <Element name="result"></Element>
      {
        resultData.isReady &&
        <div className={styles.resultDashboard}>
          <div className={styles.appMainPartResultForm}>
            <div className={styles.appMainPartResultFormView}>
              <div className={styles.appMainPartResultFormViewForm}>
                <ForecastChart
                  TotalRevenue={totalRevenue}
                  chosenForecast={resultData.chosenForecast}
                  anotherForecast={resultData.otherForecasts[0]}
                  forecastType={resultData.forecastType}
                />
              <GenresText data={genresData} />
              {
                isMarketReady &&
                <EmailSendingForm
                  cachedEmail={userData.email}
                  forecastId={resultData.id}
                  revenueString={`With Xsolla you can earn ${resultData.forecastType === 'Percentage' ?
                    `${totalRevenue}%` :
                    (totalRevenue > 1000000 ?
                      `$${Math.round(parseFloat(totalRevenue / 1000000) * 100) / 100} kk` :
                      `$${totalRevenue}`)} in 12 months.`}
                  monetizationString={ sumUp === 'good' ?
                  `The ${resultData.chosenForecast.monetization} monetization model perfectly suits the concepts of your game. Sticking to it might gradually increase your revenue by ${halfRevenue} within 6 months.` :
                  `The ${resultData.chosenForecast.monetization} monetization model can't really meet the needs of your game. We suggest you try another approach. Monetization model "${resultData.otherForecasts[0].monetization}" is a better option which might make your revenue grow by ${halfRevenue} within 6 months` }
                  topMarket={topMarket}
                />
                }
              </div>
            </div>
          </div>
          <DashboardCard
            genres={genresData}
            forecastData={resultData}
            toSumUp={sumUp}
            revenue={totalRevenue}
            halfRevenue={halfRevenue}
          />
        </div>
      }
    </>
  );
};

export default ResultDashboard;
