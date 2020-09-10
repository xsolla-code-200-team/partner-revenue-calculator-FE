import React, { useState } from 'react';
import { Button, Input, Notification } from 'xsolla-uikit';

import FormErrors from './components/FormErrors';
import fonts from './scss/fonts.scss';
// import logo from './pics/logo.png';

const MainPage = () => {
  const [email, setEmail] = useState('simple.mail@gmail.com');
  const [formErrors, setFormErrors] = useState({ email: '' });
  const [isValidForm, setIsValidForm] = useState(true);
  const [generalState, setGeneralState] = useState({
    isLoading: false,
    hasError: false,
    isSent: false,
  });

  const handleClick = () => {
    setGeneralState({
      isLoading: true,
      hasError: false,
      isSent: false,
    });

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
        setGeneralState({ isLoading: false });
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setGeneralState({ hasError: false, isSent: true });
        console.log(data);
      })
      .catch((e) => {
        setGeneralState({ isLoading: false, hasError: true });
        console.log(`Error: ${e.message}`);
        console.log(e.response);
      });
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    const error = newValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'is invalid';
    setEmail(e.target.value);
    setFormErrors({ email: error });
    setIsValidForm(!error);
  };

  return (
    <>
      {/* <img src={logo} /> */}
      <p className={fonts.display}>XPC Form</p>
      <FormErrors formErrors={formErrors} />
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
          !isValidForm
        }
        fetching={
          !!generalState.isLoading
        }
      >
        Send email
      </Button>
      { generalState.isSent && <Notification appearance="simple" status="success" title="Success!" /> }
      { generalState.hasError && <Notification status="error" title="Error" /> }
    </>
  );
};

export default MainPage;
