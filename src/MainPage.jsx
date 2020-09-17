import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Notification } from 'xsolla-uikit';
import { Link } from 'react-router-dom';

import InputField from './components/InputField';
import SelectField from './components/SelectField';
import CheckboxPlate from './components/CheckboxPlate';
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

const labels = {
  email: 'Введите ваш email:',
  companyName: 'Как называется ваша компания?',
  productName: 'Как называется ваш продукт?',
  genres: 'Выберите жанры, к которым относится ваш продукт:',
  monetization: 'Какая у вашего продукта модель монетизации?',
  platforms: 'На каких платформах распространяется ваш продукт?',
  regions: 'На какие региональные рынки вы хотели бы вывести ваш продукт?',
  sales: 'Предположите количество продаж вашего продукта:',
  score: 'Как в среднем вы бы оценили ваш продукт?',
  sendButton: 'Отправить'
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
    sales: 0,
    score: 0
  });

  const firstRender = useRef(true);

  //
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    formValidation();
  }, [reqData]);

  // too much
  const formValidation = () => {
    let errors = {};

    if (!reqData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.email = 'email is invalid';
    }
    if (!reqData.companyName.match(/[A-Za-zА-ЯЁа-яё0-9]+/g)) {
      errors.companyName = 'skip';
    }
    if (!reqData.productName.match(/[A-Za-zА-ЯЁа-яё0-9]+/g)) {
      errors.productName = 'skip';
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
          setTimeout(() => {
            setGeneralState({ ...generalState, hasError: false, isSent: true, isClicked: true })
          }, 3000);
        })
        .catch((e) => {
          setMessage(e.message);
          setTimeout(() => {
            setGeneralState({ ...generalState, isLoading: false, hasError: true, isClicked: true })
          }, 3000);
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
        <div className={styles.body}>
          <header className={styles.appHeader}>
            <div className={styles.appHeaderIcon}>
              <div className={styles.appHeaderIconInfo} />
              <div className={styles.appHeaderTitle}>
                <div className={styles.appHeaderTitleInfo}>
                  <a className={fonts.display}>BI-Simulator</a>
                </div>
              </div>
            </div>
          </header>
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
                        labelText={labels.companyName}
                    />
                    <label className={fonts.title} style={{ marginTop: '1%' }}>{labels.productName}</label>
                    <Input
                        name="productName"
                        size="sm"
                        input={{
                          value: reqData.productName,
                          onChange: handleChangeInput
                        }}
                    />
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.genres}</p>
                    <CheckboxPlate name={'genres'} onChangeReqData={handleChangeFields} checkboxes={genres} />
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.monetization}</p>
                    <SelectField name={'monetization'} onChangeReqData={handleChangeFields} options={monetization}/>
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.platforms}</p>
                    <CheckboxPlate name={'platforms'} onChangeReqData={handleChangeFields} checkboxes={platforms}/>
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.regions}</p>
                    <CheckboxPlate name={'regions'} onChangeReqData={handleChangeFields} checkboxes={regions}/>
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.sales}</p>
                    <Input
                        type="number"
                        name="sales"
                        size="sm"
                        input={{
                          value: reqData.sales,
                          onChange: handleChangeInput
                        }}
                    />
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.score}</p>
                    <Input
                        type="number"
                        name="score"
                        size="sm"
                        input={{
                          value: reqData.score,
                          onChange: handleChangeInput
                        }}
                    />
                    <p className={fonts.title} style={{ marginTop: '1%' }}>{labels.email}</p>
                    <Input
                        name="email"
                        type="email"
                        size="sm"
                        input={{
                          value: reqData.email,
                          onChange: handleChangeInput,
                        }}
                    />
                    <FormErrors formErrors={formErrors} />
                    <p></p>
                    <Link
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
                    </Link>
                  </div>
                </div>
              </div>
              {generalState.isClicked && <ResultsField TotalRevenue={responseData.totalRevenue} RevenuePerMonth={responseData.revenuePerMonth} isSent={generalState.isSent} Error={message} />}
            </section>
          </div>
          <footer className={styles.appFooter} />
        </div>
      </>
  );
};

export default MainPage;
