import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import CalculationForm from '../components/CalculationForm';
import ResultsField from '../components/ResultsField';
import fonts from '../scss/fonts.scss';
import styles from '../scss/styles.scss';

const labelsEng = {
  email: 'your email',
  companyName: 'company name',
  productName: 'product name',
  genres: 'game genres',
  monetization: 'monetization',
  platforms: 'platforms',
  regions: 'geography of your game',
  sales: 'first month expected sales',
  score: 'average product cost',
  sendButton: 'send',
};

const MainPage = () => {
  const [responseData, setResponseData] = useState({});

  const [generalState, setGeneralState] = useState({
    isClicked: false,
  });
  const [message, setMessage] = useState('');

  const handleChangeResponseData = (data) => {
    setResponseData(data);
  };

  const handleChangeIsClicked = (value) => {
    setGeneralState({ ...generalState, isClicked: value });
  };

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  return (
    <>
      <div className={styles.appMainPart}>
        <section className={styles.appMainPartForm}>
          <div className={styles.appMainPartFormAbout}>
            <div className={styles.appMainPartFormAboutTitle}>
              <p className={fonts.title}>BRING YOUR BEST GAME</p>
              <a className={fonts.display}>Market, sell, connect, and optimize your game with our powerful, easy-to-use platform.</a>
            </div>
          </div>
          <div className={styles.appMainPartFormView}>
            <div className={styles.appMainPartFormViewQuestions}>
              <CalculationForm
                labels={labelsEng}
                onChangeResponseData={handleChangeResponseData}
                onClick={handleChangeIsClicked}
                onChangeErrorMessage={handleChangeMessage}
              />
            </div>
          </div>
          {generalState.isClicked
              && <ResultsField Error={message} id={responseData.id} />}
        </section>
      </div>
    </>
  );
};

export default MainPage;
