import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// import from '../components/'
import CalculationForm from '../components/CalculationForm';
import AdvancedCalculationForm from '../components/AdvancedCalculationForm';
import ResultsField from '../components/ResultsField';
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

  const handleChangeIsClicked = (value) => {
    setGeneralState({ ...generalState, isClicked: value });
  };

  const handleSwitchFormType = (showForm) => {
    setIsFormHidden(false);
    if (showForm === 'simpleForm') {
      if (isAdvancedForm) {
        setGeneralState({ ...generalState, isClicked: false });
        setIsAdvancedForm(false);
      }
    } else if (showForm === 'advancedForm') {
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
      <div className={styles.appMainPart}>
        <section className={styles.appMainPartForm}>
          <div className={styles.appMainPartFormAbout}>
            <div className={styles.appMainPartFormAboutTitle}>
              <p className={fonts.title}>BRING YOUR BEST GAME</p>
              <a className={fonts.display}>Market, sell, connect, and optimize your game with our powerful, easy-to-use platform.</a>
            </div>
          </div>
          <div className={styles.appMainPartFormView}>
            {/* BUTTONS PLACE */}
            <div><span style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '20px', 
              color: '#fafbfc', 
              padding: '10px 0 10px 0', 
              textTransform: 'uppercase',
              fontFamily: 'Graphiklcg,sans-serif',
              }} >Choose your destiny</span></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                name="simpleForm"
                type="button"
                style={{ width: '200px', height: '50px', backgroundColor: '#ff005b', fontSize: '20px', textTransform: 'uppercase',
                fontFamily: 'Graphiklcg,sans-serif', border: '5px solid', borderColor: '#fafbfc', marginRight: '10px', }}
                onClick={() => handleSwitchFormType('simpleForm')}
                ><span style={{ color: '#fafbfc', }} >I'm a newbie</span></button>
              <button
                name="advancedForm"
                type="button"
                style={{ width: '200px', height: '50px', backgroundColor: 'rgb(0, 36, 77)', fontSize: '20px', textTransform: 'uppercase',
                fontFamily: 'Graphiklcg,sans-serif', border: '5px solid', borderColor: '#fafbfc', marginLeft: '10px', }}
                onClick={() => handleSwitchFormType('advancedForm')}
                ><span style={{ color: '#fafbfc', }} >I'm a pro</span></button>
            </div>
            <div className={styles.appMainPartFormViewQuestions}>
              {
                !isFormHidden && (isAdvancedForm ?
                <AdvancedCalculationForm
                  labels={labelsEng}
                  onChangeResponseData={handleChangeResponseData}
                  onClick={handleChangeIsClicked}
                  onChangeErrorMessage={handleChangeMessage}
                  url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Complex'}
                /> :
                <CalculationForm
                  labels={labelsEng}
                  onChangeResponseData={handleChangeResponseData}
                  onClick={handleChangeIsClicked}
                  onChangeErrorMessage={handleChangeMessage}
                  url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
                />)
              }
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
