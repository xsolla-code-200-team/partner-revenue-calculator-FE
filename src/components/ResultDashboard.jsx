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
  const [sumUp, setSumUp] = useState((
    inputData.isReady ? (
      inputData.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value) >
      inputData.otherForecasts[0].tendencyForecast.reduce((acc, value) => acc + value) ?
      'good' : 'bad'
    ) : ''
  ));

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
      setGenresData(outputData);
    });
  }

  // const getStatistics = () => {
  //   let genres_Info = [];
  //   for(let i = 0; i < userData.genres.length; i += 1) {
  //       fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/StaticAnalytics/${userData.genres[i]}`, {
  //           method: 'GET',
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //       })
  //           .then((res) => {
  //               if (res.status >= 200 && res.status < 300) {
  //                   return res;
  //               }
  //               const error = new Error(res.statusText);
  //               error.response = res;
  //               throw error;
  //           })
  //           .then((response) => response.json())
  //           .then((data) => {
  //               console.log('getGenresInfo (GET id):');
  //               console.log(data);
  //               console.log(data);
  //               genres_Info.push(data);
  //               if (genres_Info.length === userData.genres.length) { setGenres(genres_Info); setGenresReady(true); genres.filter((a,b) => a.regionsInfo.revenue/a.regionsInfo.price - b.regionsInfo.revenue/b.regionsInfo.price).splice(2,10);}
  //           })
  //           .catch((e) => {
  //               console.log(e.message);
  //               setError(e.message);
  //           });
  //   }
  // }

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
              <EmailSendingForm
                cachedEmail={userData.email}
                forecastId={resultData.id}
              />
              </div>
            </div>
          </div>
          <DashboardCard
            genres={genresData}
            forecastData={resultData}
            toSumUp={sumUp}
            revenue={totalRevenue}
          />
        </div>
      }
    </>
  );
};

export default ResultDashboard;
