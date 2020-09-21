import React, { useState } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Button } from 'xsolla-uikit';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

const ProgressBar = ({ TotalRevenue, RevenuePerMonth, ...props }) => {
  const [generalState, setGeneralState] = useState({
    isPlaced: false,
  });
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
      accessibility: {
        rangeDescription: 'Range: 1 to 6',
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
      name: 'Revenue',
      data: RevenuePerMonth,
    }, {
      type: 'spline',
      regression: true,
      regressionSettings: {
        type: 'exponential',
        color: 'rgba(45, 83, 83, .9)',
      },
      name: 'Trendline',
      color: 'rgba(23, 83, 83, .5)',
      data: RevenuePerMonth,

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
      <div className={styles.appMainPartResultFormViewFormTitle}>
        <p className={fonts.display}>RESULTS</p>
      </div>
      <div className={styles.appMainPartResultFormViewFormResult}>
        <div className={styles.ResultsTotal}>
          <p className={fonts.title}>
            Your revenue gonna be :
            {' '}
            {TotalRevenue}
          </p>
        </div>
        <div className={styles.ResultsChart}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
