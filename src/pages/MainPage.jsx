import React, { useState, useEffect, useRef } from 'react';
// import { renderToStaticMarkup, renderToString } from 'react-dom/server';
// import { hydrate } from 'react-dom';
// var juice = require('juice');
// import juice from 'juice';
// import fs from 'fs';

import CalculationForm from '../components/CalculationForm';
import AdvancedCalculationForm from '../components/AdvancedCalculationForm';
import ResultDashboard from '../components/ResultDashboard';
import fonts from '../scss/fonts.scss';
import styles from '../scss/styles.scss';
import {Popup} from "semantic-ui-react";

const labelsEng = {
  email: 'email',
  companyName: 'company or individual name',
  productName: 'product name',
  genres: 'genres (at most three)',
  monetization: 'monetization',
  platforms: 'platforms',
  regions: 'distribution regions',
  initialRevenue: 'initial revenue for the 1st month',
  sendButton: 'calculate',
  releaseDate: 'date of release',
  isReleased: 'my game has already been released',
};

const MainPage = () => {
  const [responseData, setResponseData] = useState({});
  const [genresInfo, setGenresInfo] = useState({});
  const [generalState, setGeneralState] = useState({
    isClicked: false,
  });
  const [message, setMessage] = useState('');
  const [isAdvancedForm, setIsAdvancedForm] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

  const handleChangeResponseData = (data) => {
    setResponseData(data);
  };

  const handleChangeGenresInfo = (data) => {
    setGenresInfo(data);
  };

  const handleFormClick = (value) => {
    setGeneralState({ ...generalState, isClicked: value });
  };

  const handleSwitchFormType = (showFormType) => {
    setIsFormHidden(false);
    if (showFormType === 'simpleForm') {
      if (isAdvancedForm) {
        setGeneralState({ ...generalState, isClicked: false });
        setIsAdvancedForm(false);
      }
    } else if (showFormType === 'advancedForm') {
      if (!isAdvancedForm) {
        setGeneralState({ ...generalState, isClicked: false });
        setIsAdvancedForm(true);
      }
    }
  }

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  // const handleGetHtml = () => {
  //   // const styleString = require('../scss/styles.scss').toString();
  //   // console.log(styleString);
  //   const styleString = require('css-to-string-loader!css-loader!../../dist/main.css').toString();
  //   const juiceOpts = {
  //     preserveMediaQueries: true,
  //     removeStyleTags: true,
  //     webResources: {
  //       images: false
  //     }
  //   };

  //   const doc =
  //     <CalculationForm
  //       labels={labelsEng}
  //       onChangeResponseData={handleChangeResponseData}
  //       onClick={handleFormClick}
  //       onChangeErrorMessage={handleChangeMessage}
  //       url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
  //     />;
  //   const new_doc = juice.inlineContent(renderToStaticMarkup(doc), styles, juiceOpts);
  //   // console.log(styles);
  //   // setHasSent({has: true, sent: JSON.stringify(new_doc)});
  //   setHasSent({has: true, sent: JSON.stringify(styleString)});

  //   // fetch('https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Export', {
  //   //   method: 'POST',
  //   //   body: JSON.stringify({ email: "test@mail.com", content: new_doc }),
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // })
  //   //   .then((res) => {
  //   //     if (res.status >= 200 && res.status < 300) {
  //   //       return res;
  //   //     }
  //   //     const error = new Error(res.statusText);
  //   //     error.response = res;
  //   //     throw error;
  //   //   })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log('resData (POST):');
  //   //     console.log(data);
  //   //   })
  //   //   .catch((e) => {
  //   //     console.log(e.message);
  //   //   });
  // }

  // const [hasSent, setHasSent] = useState({ has: false, sent: '' });

  return (
    <>
      <div className={styles.mainPage}>
        <div className={styles.mainPageButtons}>
          <div className={(!isFormHidden && !isAdvancedForm) ? `${styles.mainPageButtons__button_simple_chosen} ${styles.mainPageButtons__text}` : `${styles.mainPageButtons__button_simple} ${styles.mainPageButtons__text}`}>
            <button
              type="button"
              onClick={() => handleSwitchFormType('simpleForm')}
            >
              <p className={fonts.title3}>I WANT TO DECIDE ON PARAMETERS</p>
              <p className={fonts.title3}>OF MY FUTURE GAME</p>
            </button>
          </div>
          <div className={(!isFormHidden && isAdvancedForm) ? `${styles.mainPageButtons__button_advanced_chosen} ${styles.mainPageButtons__text}` : `${styles.mainPageButtons__button_advanced} ${styles.mainPageButtons__text}`}>
            <button
              type="button"
              onClick={() => handleSwitchFormType('advancedForm')}
            >
              <p className={fonts.title3}>I WANT TO BRING MY COMPLETED GAME</p>
              <p className={fonts.title3}>TO THE NEXT LEVEL</p>
            </button>
          </div>
        </div>
        {
          !isFormHidden && (isAdvancedForm ?
              <div className={styles.mainPageForm}>
                <AdvancedCalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onChangeGenresInfo={handleChangeGenresInfo}
                    onClick={handleFormClick}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Complex'}
                />
              </div> :
              <div className={styles.mainPageForm}>
                <CalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onChangeGenresInfo={handleChangeGenresInfo}
                    onClick={handleFormClick}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
                />
              </div>)
        }
          { generalState.isClicked &&
            <ResultDashboard inputData={responseData} genresInfo={genresInfo} /> }
        {/* <button type="button" onClick={() => handleGetHtml()}>get html</button>
          { hasSent.has && <p>{hasSent.sent}</p> } */}
      </div>
    </>
  );
};

export default MainPage;
