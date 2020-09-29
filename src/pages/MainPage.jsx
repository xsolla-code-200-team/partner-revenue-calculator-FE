import React, { useState, useEffect, useRef } from 'react';

import CalculationForm from '../components/CalculationForm';
import AdvancedCalculationForm from '../components/AdvancedCalculationForm';
import ResultDashboard from '../components/ResultDashboard';
import fonts from '../scss/fonts.scss';
import styles from '../scss/styles.scss';

const labelsEng = {
  email: 'email',
  companyName: 'company or individual name',
  productName: 'product name',
  genres: 'genres',
  monetization: 'monetization',
  platforms: 'platforms',
  regions: 'distribution regions',
  sales: 'average first month sales',
  sales2: 'first month expected sales',
  cost: 'average product cost',
  sendButton: 'calculate',
  releaseDate: 'date of release',
};

const MainPage = () => {
  const [responseData, setResponseData] = useState({});
  const [generalState, setGeneralState] = useState({
    isClicked: false,
  });
  const [message, setMessage] = useState('');
  const [isAdvancedForm, setIsAdvancedForm] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

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

  return (
    <>
      <div className={styles.mainPage}>
        <div className={styles.mainPageButtons}>
          <div className={`${styles.mainPageButtons__button__simple} ${styles.mainPageButtons__text}`}>
            <button
              type="button"
              onClick={() => handleSwitchFormType('simpleForm')}
            >
              <p className={fonts.title3}>I WANT TO DECIDE ON PARAMETERS</p>
              <p className={fonts.title3}>OF MY FUTURE GAME</p>
            </button>
          </div>
          <div className={`${styles.mainPageButtons__button__advanced} ${styles.mainPageButtons__text}`}>
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
                />
              </div> :
              <div className={styles.mainPageForm}>
                <CalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onClick={handleFormClick}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
                />
              </div>)
        }
          { generalState.isClicked &&
            <ResultDashboard inputData={responseData} /> }
      </div>
    </>
  );
};

export default MainPage;
