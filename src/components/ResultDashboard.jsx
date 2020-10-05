import React, { useState, useEffect, useRef } from 'react';
import { Link, animateScroll as scroll, Element, scroller } from 'react-scroll';

import { Popup } from 'semantic-ui-react';
import styles from '../scss/styles.scss';
import ForecastChart from './ForecastChart';
import LinkButton from './LinkButton';
import fonts from '../scss/fonts.scss';

const ResultDashboard = ({ inputData, genresInfo,...props }) => {
  const [resultData, setResultData] = useState(inputData);
  const [isGenresReady, setGenresReady] = useState(false);
  const [error, setError] = useState('');
  const [genres, setGenres] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState((
    inputData.isReady ?
    Math.round(inputData.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value)) :
    0
  ));

  const getStatistics = () => {
    let genres_Info = [];
    for(let i = 0; i < genresInfo.length; i += 1) {
        fetch(`https://api-xsolla-revenue-calculator.herokuapp.com/StaticAnalytics/${genresInfo[i]}`, {
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
                console.log('getGenresInfo (GET id):');
                console.log(data);
                console.log(data);
                genres_Info.push(data);
                if (genres_Info.length === genresInfo.length) { setGenres(genres_Info); setGenresReady(true); genres.filter((a,b) => a.regionsInfo.revenue/a.regionsInfo.price - b.regionsInfo.revenue/b.regionsInfo.price).splice(2,10);}
            })
            .catch((e) => {
                console.log(e.message);
                setError(e.message);
            });
    }
  };

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
            setTotalRevenue(Math.round(data.chosenForecast.tendencyForecast.reduce((acc, value) => acc + value)));
            getStatistics();
          }
          setResultData(data);
        })
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        });
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    if (resultData.isReady && isGenresReady) {
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

  const GenresText = () => {
      return (
          <div className={styles.GenresInfo}>
              <div className={styles.ForecastTitle}>
                  <p className={fonts.title}>We have also prepared the analytics for every genre that your game has that includes data on average price and sales in different regions of the world.</p>
              </div>
              {
                  genres.map((genre) =>
                      <div className={styles.GenresInfo__item}>
                         <div className={styles.GenresInfo__item__title}>
                              <p className={fonts.display}>{genre.genre}</p>
                          </div>
                          <div className={styles.GenresInfo__item__text}>
                              {/*<p className={fonts.title2}>Games of this genre are more popular in regions <Popup content={`Average game price ${Math.round(genre.regionsInfo[0].price)} ` + `Average sales ${Math.round(genre.regionsInfo[0].revenue)}`} trigger={<p>{genre.regionsInfo[0].region}</p>} position='top center'/>,*/}
                              {/*    <Popup content={`Average game price ${Math.round(genre.regionsInfo[1].price)} ` + `Average sales ${Math.round(genre.regionsInfo[1].revenue)}`} trigger={<p>{genre.regionsInfo[1].region}</p>} position='top center'/>*/}
                              {/*    and <Popup content={`Average game price ${Math.round(genre.regionsInfo[2].price)} ` + `Average sales ${Math.round(genre.regionsInfo[2].revenue)}`} trigger={<p>{genre.regionsInfo[2].region}</p>} position='top center'/>. Explore these opportunities with the help of Xsolla. </p>*/}
                          </div>
                      </div>
                  )
              }
          </div>
      )
  };

  return (
    <div className={styles.resultDashboard}>
        <Element name="result"></Element>
      <div className={styles.appMainPartResultForm}>
        {
          resultData.isReady &&
          <div className={styles.appMainPartResultFormView}>
            <div className={styles.appMainPartResultFormViewForm}>
              {
                resultData.isReady &&
                <ForecastChart
                  TotalRevenue={totalRevenue}
                  chosenForecast={resultData.chosenForecast}
                  anotherForecast={resultData.otherForecasts[0]}
                  forecastType={resultData.forecastType}
                />
              }
              {
                isGenresReady && <GenresText data={genres} />

              }
            </div>
            <div className={styles.resultDashboardButtons}>
              {/* place for Sending Email */}
              <div className={styles.resultDashboardButtons_other}>
                <LinkButton
                  link="https://publisher.xsolla.com/"
                  text="Get started"
                  customStyle={styles.publisherAccountButton}
                />
                <LinkButton
                  link="https://xsolla.com/contact-sales"
                  text="Contact us"
                  customStyle={styles.appHeaderButtonsContact}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ResultDashboard;
