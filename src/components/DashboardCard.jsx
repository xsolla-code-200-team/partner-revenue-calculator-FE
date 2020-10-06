import React, { useEffect, useState, useRef } from 'react';

import LinkButton from './LinkButton';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';
import dashboard from '../pics/dashboard.jpg';

const DashboardCard = ({ genres, forecastData, toSumUp, revenue, ...props }) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  }, []);

    return (
        <div className={styles.dashboardCard}>
            <div className={styles.dashboardCard__image}>
              <img src={dashboard} />
            </div>
            <div className={styles.dashboardCard__text}>
                <p style={{color: "#0076ff", textTransform: "uppercase"}} className={fonts.title2}>To sum up:</p>
                <p className={fonts.title}>
                  &bull; With Xsolla you can earn {forecastData.forecastType === 'Percentage' ?
                    `${revenue}%` :
                    (revenue > 1000000 ?
                      `$${Math.round(parseFloat(revenue / 1000000) * 100) / 100} kk` :
                      `$${revenue}`)} in 12months.</p>
                <p className={fonts.title}>
                  &bull; {
                    toSumUp === 'good' ? 
                    `The "${forecastData.chosenForecast.monetization}" monetization model perfectly suits the concepts of your game. Sticking 
                    to it might gradually increase your revenue by ????? within 6 months.` :
                    `The "${forecastData.chosenForecast.monetization}" monetization model can't really meet the needs of your game. We suggest 
                    you try another approach. Monetization model "${forecastData.otherForecasts[0].monetization}" is a better option which 
                    might make your revenue grow by ????? within 6 months`
                  }
                </p>
                <p className={fonts.title}>&bull; You can expand your game coverage by releasing in these Top-3 markets:</p>
                {
                  genres.map(element => 
                    <p className={fonts.title}>&#9675; Region {element.region} - best for "{element.genre}" genre</p>    
                  )
                }
            </div>
            <div className={styles.dashboardCardButtons}>
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
    );
}

export default DashboardCard;
