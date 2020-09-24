import React, { useState } from 'react';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';
import CalculationForm from './CalculationForm';
import AdvancedCalculationForm from './AdvancedCalculationForm';

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

const SelectForm = () => {
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
    <div className={styles.InitialPageViewSelectForm}>
      <div className={styles.InitialPageViewSelectFormView}>
        <div className={styles.InitialPageViewSelectFormViewButtonEasy}>
          <div className={styles.InitialPageViewSelectFormViewButtonText}>

            <button onClick={() => handleSwitchFormType('simpleForm')}><p className={fonts.title2}>I WANT TO BRING MY GAME TO THE NEXT LEVEL</p></button>
          </div>
        </div>
        <div className={styles.InitialPageViewSelectFormViewButtonHard}>
          <div className={styles.InitialPageViewSelectFormViewButtonText}>
            <button onClick={() => handleSwitchFormType('advancedForm')}><p className={fonts.title2}>I WANT TO KICKSTART MY GAME</p></button>
          </div>
        </div>
      </div>
      {
        !isFormHidden && (isAdvancedForm ?
            <div className={styles.appMainPartFormView}>
              <div className={styles.appMainPartFormViewQuestions}>
                <AdvancedCalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onClick={handleChangeIsClicked}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Complex'}
                />
              </div>
            </div> :
            <div className={styles.appMainPartFormView}>
              <div className={styles.appMainPartFormViewQuestions}>
                <CalculationForm
                    labels={labelsEng}
                    onChangeResponseData={handleChangeResponseData}
                    onClick={handleChangeIsClicked}
                    onChangeErrorMessage={handleChangeMessage}
                    url={'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Simple'}
                />
              </div>
            </div>)
      }
    </div>
  </>
  );
};

export default SelectForm;
