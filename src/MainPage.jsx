import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Notification } from 'xsolla-uikit';
import { Link } from 'react-router-dom';

import InputField from './components/inputField/InputField';
import CheckboxPlate from './components/checkboxPlate/CheckboxPlate';
import FormErrors from './components/FormErrors';
import ResponseField from './components/ResponseField';
import ResultsField from './components/ResultsField';
import fonts from './scss/fonts.scss';
import styles from './scss/styles.scss';

const genres = [
  'rpg',
  'action',
  'adventure',
  'simulation',
  'puzzle',
  'strategy',
  'arcade',
  'casual',
  'platformer',
  'racing',
  'shooter',
  'other'
];

const monetization = [
  'Free2Pay',
  'Pay2Pay',
  'Other'
];

const platforms = [
  'PC',
  'Mac',
  'Android',
  'iOS',
  'Web',
  'Other'
];

const regions = [ 1, 2, 3, 4, 8, 10, 11, 12, 13, 14 ];

const labelsEng = {
  email: 'your email',
  companyName: 'company name',
  productName: 'product name',
  genres: 'game genres',
  monetization: 'monetization',
  platforms: 'platforms',
  regions: 'geography of your game',
  sales: 'month sales',
  score: 'average cost',
  sendButton: 'send'
};

const MainPage = () => {
  const [responseData, setResponseData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);
  const [generalState, setGeneralState] = useState({
    isLoading: false,
    hasError: false,
    isSent: false,
    isClicked: false,
  });
  const [message, setMessage] = useState('');
  const [reqData, setReqData] = useState({
    email: '',
    companyName: '',
    productName: '',
    genres: [],
    monetization: monetization[0],
    platforms: [],
    regions: [],
    sales: '1',
    score: '1'
  });

  const firstRender = useRef(true);

  //
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log(reqData);
    formValidation();
  }, [reqData]);

  // too much
  const formValidation = () => {
    let errors = {};

    if (!reqData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.email = 'email is invalid';
    }
    if (!reqData.companyName.match(/[A-Za-zА-ЯЁа-яё0-9]+/g)) {
      errors.companyName = 'company name is required';
    }
    if (!reqData.productName.match(/[A-Za-zА-ЯЁа-яё0-9]+/g)) {
      errors.productName = 'product name is required';
    }
    if (!reqData.genres.length) {
      errors.genres = 'skip';
    }
    if (!reqData.monetization) {
      errors.monetization = 'skip';
    }
    if (!reqData.platforms.length) {
      errors.platforms = 'skip';
    }
    if (!reqData.regions.length) {
      errors.regions = 'skip';
    }
    if (!Number(reqData.sales) === 0) {
      errors.sales = 'skip';
    } else if (Number(reqData.sales) < 0) {
      errors.sales = 'bad sales';
    }
    if (Number(reqData.score) === 0) {
      errors.score = 'skip';
    } else if (Number(reqData.score) < 0 || Number(reqData.score) > 10) {
      errors.score = 'bad score';
    }

    setFormErrors(errors);
    setIsValidForm(!Object.keys(errors).length);
  }

  const handleClick = () => {
    setGeneralState({
      isLoading: true,
      hasError: false,
      isSent: false,
      isClicked:true,
    });

    fetch('https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast', {
      method: 'POST',
      body: JSON.stringify({ ...reqData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        // .then(res => res.ok? res : Promise.reject(res))
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          }
          const error = new Error(res.statusText);
          error.response = res;
          throw error;
        })
        // .then((res) => {
        //   if (res.headers['content-type'] !== 'application/json') {
        //     const error = new Error('Incorrect server response.');
        //     error.response = res;
        //     throw error;
        //   }
        //   return res;
        // })
        .then((res) => {
          setGeneralState({ ...generalState, isLoading: false, isClicked: true });
          return res;
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.stringify({ ...reqData }));
          setResponseData(data);
          console.log(data);
          setGeneralState({ ...generalState, hasError: false, isSent: true, isClicked: true });
        })
        .catch((e) => {
          setMessage(e.message);
          setGeneralState({ ...generalState, isLoading: false, hasError: true, isClicked: true });
        });
  };

  const handleChangeInput = (e) => {
    setReqData({ ...reqData, [e.target.name]: e.target.value });
  }

  const handleChangeFields = (name, value) => {
    setReqData({ ...reqData, [name]: value });
  }

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
                  <div className={styles.appMainPartFormViewQuestionsForm}>
                    <InputField
                        name={'companyName'}
                        value={reqData.companyName}
                        onChangeReqData={handleChangeFields}
                        labelText={labelsEng.companyName}
                        type={'text'}
                        placeholder={'super company'}
                    />
                    <InputField
                        name={'productName'}
                        value={reqData.productName}
                        onChangeReqData={handleChangeFields}
                        labelText={labelsEng.productName}
                        type={'text'}
                        placeholder={'super game'}
                    />
                    <CheckboxPlate name={'genres'} onChangeReqData={handleChangeFields} checkboxes={genres} labelText={labelsEng.genres} multipleChoice={true} />
                    <CheckboxPlate name={'monetization'} onChangeReqData={handleChangeFields} checkboxes={monetization} labelText={labelsEng.monetization} multipleChoice={false} />
                    <CheckboxPlate name={'platforms'} onChangeReqData={handleChangeFields} checkboxes={platforms} labelText={labelsEng.platforms} multipleChoice={true} />
                    <CheckboxPlate name={'regions'} onChangeReqData={handleChangeFields} checkboxes={regions} labelText={labelsEng.regions} multipleChoice={true} />
                    <InputField
                        name={'sales'}
                        value={reqData.sales}
                        onChangeReqData={handleChangeFields}
                        labelText={labelsEng.sales}
                        type={'number'}
                    />
                    <InputField
                        name={'score'}
                        value={reqData.score}
                        onChangeReqData={handleChangeFields}
                        labelText={labelsEng.score}
                        type={'number'}
                    />
                    <InputField
                        name={'email'}
                        value={reqData.email}
                        onChangeReqData={handleChangeFields}
                        labelText={labelsEng.email}
                        type={'email'}
                        placeholder={'your@email.com'}
                    />
                    <FormErrors formErrors={formErrors} />
                    <p></p>
                    {/* <Link
                      to={ResultsField}
                    >
                      <Button
                          type="button"
                          appearance="secondary"
                          onClick={handleClick}
                          disabled={!isValidForm}
                          fetching={generalState.isLoading}
                      >
                        {labels.sendButton}
                      </Button>
                    </Link> */}
                    {/* old button */}
                    <Button
                    type="button"
                    appearance="secondary"
                    onClick={handleClick}
                    disabled={!isValidForm}
                    fetching={generalState.isLoading}
                    >
                      {labelsEng.sendButton}
                    </Button>
                  </div>
                </div>
              </div>
              {generalState.isClicked &&
              <ResultsField isSent={generalState.isSent} Error={message} id={responseData.id}/>} */}
            </section>
          </div>
      </>
  );
};

export default MainPage;
