import React, { useState, useCallback } from 'react';
import {
  Button, Input, Notification } from 'xsolla-uikit';

import FormErrors from './components/FormErrors';
import fonts from './scss/fonts.scss';
import styles from './scss/styles.scss';
// import logo from './pics/logo.png';

const MainPage = () => {
  const [email, setEmail] = useState('email@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [hasError, setHasError] = useState({ value: false, message: '' });
  const [formErrors, setFormErrors] = useState({ email: '' });
  const [isValid, setIsValid] = useState(true);

  const handleClick = () => {
    setHasError({ value: false, message: '' });
    setIsLoading(true);
    setIsSent(false);

    fetch('https://xsolla-revenue-calculator-be.herokuapp.com/RevenueForecast', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
      //     const error = new Error('Incorrect server response');
      //     error.response = res;
      //     throw error;
      //   }
      //   return res;
      // })
      .then((res) => {
        console.log(`Response headers: ${res.headers}`);
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setHasError({ value: false, message: '' });
        setIsSent(true);
        console.log(data);
      })
      .catch((e) => {
        setIsLoading(false);
        setHasError({ value: true, message: e.message });
        console.log(`Error: ${e.message}`);
        console.log(e.response);
      });
  };

  const onChange = (e) => {
    // ывфвфывцвфцв
    setEmail(e.target.value);
    setFormErrors({ email:  email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'is invalid' });
    setIsValid(!formErrors.email);
  };
  

  return (
    <>
        <div className={styles.body}>
            <header className={styles.appHeader}>
                <div className={styles.appHeaderIcon}>
                    <div className={styles.appHeaderIconInfo}></div>
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
                                <p className={fonts.title}>Find your ways to grow</p>
                                <FormErrors formErrors={formErrors}/>
                                <Input
                                    name="basic-input"
                                    type="email"
                                    size="sm"
                                    input={{
                                        value: email,
                                        onChange,
                                    }}
                                />
                                <Button
                                    type="button"
                                    appearance="secondary"
                                    onClick={handleClick}
                                    // disabled={
                                    //   isValid ? false : true
                                    // }
                                    fetching={
                                        isLoading ? true : false
                                    }
                                >
                                    Send email
                                </Button>
                                { isSent && <Notification appearance="simple" status="success" title="Success!" /> }
                                { hasError.value && <Notification status="error" title="Error" /> }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer className={styles.appFooter}>
                <div className={styles.appFooterIcon}>
                    <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23FF005B' d='M0 0h70v70H0z'/%3E%3Cpath fill='%23FFF' d='M52.668 44.375c-2.847 0-5.168-2.303-5.168-5.155 0-2.853 2.321-5.157 5.168-5.157a5.157 5.157 0 010 10.313m-.001-7.501c1.286 0 2.333 1.066 2.333 2.354a2.337 2.337 0 01-2.333 2.334 2.34 2.34 0 01-2.355-2.334 2.356 2.356 0 012.355-2.354zM31.562 57.5v-9.375h2.813V57.5h-2.813zm3.75 0v-9.375h2.813V57.5h-2.813zM46.28 16.935l3.096 3.313-4.126 4.44-1.722-1.873 2.378-2.559-3.093-3.317.004-.004-.004-.007 1.74-1.854.004.007 2.381-2.581 1.74 1.852-2.398 2.583zM17.51 34.063l5.616 9.374h-11.25l5.634-9.374zm.16 5.312l-1.42 1.875h2.813l-1.393-1.875zm12.018-24.034l-3.26 3.242 3.26 3.263L27.8 23.75l-3.269-3.264-3.267 3.264-1.888-1.904 3.27-3.263-3.27-3.242 1.888-1.903 3.267 3.261 3.27-3.262 1.887 1.904z'/%3E%3C/g%3E%3C/svg%3E"
                        alt="Xsolla"></img>
                </div>
                <div className={styles.appFooterTitle}>
                    <a className={fonts.display}>DONE BY GROUP CODE 200</a>
                </div>
            </footer>
        </div>
    </>
  );
};

export default MainPage;
