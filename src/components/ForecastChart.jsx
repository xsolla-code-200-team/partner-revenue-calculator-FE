import React, { useState } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

const ForecastChart = ({ TotalRevenue, chosenForecast, anotherForecast, ...props }) => {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Revenue chart of your game',
    },

    yAxis: {
      title: {
        text: 'Revenue',
      },
    },

    xAxis: {
      title: {
        text: 'Month'
      },
      accessibility: {
        rangeDescription: 'Range: 1 to 7',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1,
      },
    },

    series: [{
      type: 'line',
      name: 'your forecast',
      data: chosenForecast.tendencyForecast.map(item => Math.round(item)),
    }, {
    //   type: 'spline',
    //   regression: true,
    //   regressionSettings: {
    //     type: 'exponential',
    //     color: 'rgba(45, 83, 83, .9)',
    //   },
    //   name: 'Trendline',
    //   color: 'rgba(23, 83, 83, .5)',
    //   data: chosenForecast.forecast,

    // }, {
      visible: false,
      type: 'line',
      name: 'another forecast',
      data: anotherForecast.tendencyForecast.map(item => Math.round(item)),
      color: 'rgba(23, 83, 83, .5)',
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      }],
    },
  });
  
  return (
    <>
      <div className={styles.ResultForecastTitle}>
        <p className={fonts.display}>RESULTS</p>
      </div>
      <div className={styles.ResultForecast}>
        <div className={styles.ForecastTotal}>
          {/* <p> */}
            <p className={fonts.title}>
              Here's a forecast for your product!
              {' '}
              Based on your data we have calculated the approximate amount of money you will recieve in six months
            </p>
            <div className={styles.totalRevenue}><p className={fonts.display}>{`$${TotalRevenue}`}</p></div>
          {/* </p> */}
        </div>
        <div className={styles.ForecastChart}>
          <p className={fonts.title2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >This number is affected by seasonal trends and other factors.</p>
          {'  '}
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
      </div>
    </>
  );
};

export default ForecastChart;
