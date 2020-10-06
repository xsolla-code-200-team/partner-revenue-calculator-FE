import React, { useState, useEffect, useRef } from 'react';
import {Popup} from "semantic-ui-react";

import CalculationForm from '../components/CalculationForm';
import AdvancedCalculationForm from '../components/AdvancedCalculationForm';
import ResultDashboard from '../components/ResultDashboard';
import fonts from '../scss/fonts.scss';
import styles from '../scss/styles.scss';

const labelsEng = {
  email: 'email',
  companyName: 'company or individual name',
  productName: 'product name',
  genres: 'genres (at most three)',
  monetization: 'monetization',
  platforms: 'platforms',
  regions: 'distribution regions',
  initialRevenue: 'initial revenue for the 1st month',
  initialRevenue_isReleased: "last month's revenue",
  sendButton: 'calculate',
  releaseDate: 'date of release',
  isReleased: 'my game has already been released',
};

const MainPage = () => {
  const [responseData, setResponseData] = useState({});
  const [generalState, setGeneralState] = useState({
    isClicked: false,
    isResponseReady: false,
  });
  const [message, setMessage] = useState('');
  const [isAdvancedForm, setIsAdvancedForm] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: '', genres: [] });

  const handleChangeResponseData = (data) => {
    setResponseData(data);
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

  const onLoading = (value) => {
    setIsLoading(value);
  }

  const onChangeUserData = (value) => {
    setUserData(value);
  }

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
                    onClick={handleFormClick}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Complex'}
                    isLoading={isLoading}
                    onChangeIsLoading={onLoading}
                    onChangeUserData={onChangeUserData}
                />
              </div> :
              <div className={styles.mainPageForm}>
                <CalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onClick={handleFormClick}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
                    isLoading={isLoading}
                    onChangeIsLoading={onLoading}
                    onChangeUserData={onChangeUserData}
                />
              </div>)
        }
          { generalState.isClicked &&
            <ResultDashboard inputData={responseData} onChangeIsLoading={onLoading} userData={userData} /> }
      </div>
    </>
  );
};

export default MainPage;
