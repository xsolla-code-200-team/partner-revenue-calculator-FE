import React, { useState } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

const ForecastChart = ({
  TotalRevenue, chosenForecast, anotherForecast, forecastType, ...props
}) => {
  const [forecastUnit, setForecastUnit] = useState((forecastType === 'Percentage') ? '%' : '$');
  const [chosenChartType, setChosenChartType] = useState(chosenForecast.tendencyForecast);
  const [anotherChartType, setAnotherChartType] = useState(anotherForecast.tendencyForecast);
  const [chartType, setChartType] = useState('Tendency');
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Revenue chart of your game',
    },

    yAxis: {
      title: {
        text: 'Revenue',
      },
      labels: {
        format: `{value} ${forecastUnit}`,
      },
    },

    xAxis: {
      title: {
        text: 'Month',
      },
      accessibility: {
        rangeDescription: 'Range: 1 to 10',
      },
      labels: {
        format: '{value}th month',
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
      data: chosenChartType.map((item) => Math.round(item)),
      color: 'rgb(0, 118, 255)',
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
      data: anotherChartType.map((item) => Math.round(item)),
      color: 'rgb(255, 0, 91)',
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

  const handleClick = (sender) => {
    if (sender === 'Tendency') {
      setChosenChartType(chosenForecast.cumulativeForecast);
      setAnotherChartType(anotherForecast.cumulativeForecast);
    }
    if (sender === 'Cumulative') {
      setChosenChartType(chosenForecast.tendencyForecast);
      setAnotherChartType(anotherForecast.tendencyForecast);
    }
  };

  return (
    <>
      <div className={styles.ResultForecastTitle}>
        <p className={fonts.display}>YOUR RESULTS</p>
      </div>
      <div className={styles.ResultForecast}>
        <div className={styles.ForecastTotal}>
          {/* <p> */}
          <div className={styles.ForecastTitle}>
            <p className={fonts.title}>Here is a forecast for your product! Based on your data we have calculated the approximate amount of money you will receive in {chosenForecast.tendencyForecast.length} months</p>
          </div>
          {'  '}
          <div className={styles.totalRevenue}><p className={fonts.display}>{(forecastUnit === '%') ? `${forecastUnit} ${TotalRevenue}` : `${forecastUnit} ${TotalRevenue / 1000} k`}</p></div>
          {/* </p> */}
        </div>
        <div className={styles.ForecastChart}>
          <div className={styles.ForecastTitle}>
            <p className={fonts.title2}>This number is affected by seasonal trends and other factors.</p>
          </div>
          {'  '}
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
          <div className={styles.ForecastButton}>
            <button className={(chartType === 'Tendency') ? styles.chosenChartType : styles.chooseChartType}><p className={fonts.title2}>Tendency forecast</p></button>
            <button className={(chartType === 'Cumulative') ? styles.chosenChartType : styles.chooseChartType}><p className={fonts.title2}>Cumulative forecast</p></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForecastChart;
