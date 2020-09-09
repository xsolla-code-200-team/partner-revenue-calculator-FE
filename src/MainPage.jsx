import React, { useState, useCallback } from 'react';
import {
  Button, Input, Notification } from 'xsolla-uikit';

import FormErrors from './components/FormErrors';
import fonts from './scss/fonts.scss';
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
      {/* <img src={logo} /> */}
      <p className={fonts.display}>XPC Form</p>
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
        disabled={
          isValid ? false : true
        }
        fetching={
          isLoading ? true : false
        }
      >
          Send email
      </Button>
      { isSent && <Notification appearance="simple" status="success" title="Success!" /> }
      { hasError.value && <Notification status="error" title="Error" /> }
    </>
  );
};

export default MainPage;
