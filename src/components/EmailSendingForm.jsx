import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'xsolla-uikit';

import InputField from './inputField/InputField';
import styles from '../scss/styles.scss';


const EmailSendingForm = ({ cachedEmail, forecastId, ...props }) => {
    const [email, setEmail] = useState(cachedEmail);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            validation("email", email);
            firstRender.current = false;
        }
    }, [email]);

    const validation = (inputName, inputValue) => {
        let error = {
          hasError: false,
          errorMessage: ''
        };
        let hasError = false;
        let errorMessage = '';
        switch(inputName) {
          case 'email':
            if (!inputValue) {
              hasError = true;
              errorMessage = 'email is required';
            } else if (!inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
              hasError = true;
              errorMessage = 'email is invalid';
            }
            break;
          default:
            break;
        }
        error.hasError = hasError;
        error.errorMessage = errorMessage;
        if (error.hasError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
        return error;
      }

    const handleChangeEmail = (name, value) => {
        setEmail(value);
    }

    const handleClick = () => {
        const url = 'https://api-xsolla-revenue-calculator.herokuapp.com/RevenueForecast/Export';
        setIsLoading(true);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ revenueForecastId: forecastId, email: email }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res;
              }
            const error = new Error(res.statusText);
            error.response = res;
            throw error;
        })
        .then(res => res.json())
        .then(data => {
            console.log('response data (/Export):');
            console.log(data);
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e.message);
            setIsLoading(false);
        });
    }

    return (
        <div className={styles.emailSendingForm}>
            <InputField
                name="email"
                value={email}
                onChangeReqData={handleChangeEmail}
                type="email"
                placeholder="your@email.com"
                validation={validation}
                customStyle={{ marginBottom: '0' }}
            />
            <Button
                type="button"
                appearance="secondary"
                onClick={handleClick}
                disabled={!isValidForm}
                fetching={isLoading}
                style={{ marginLeft: '42px' }}
            >
            Send to Email!
            </Button>
        </div>
    );
}

export default EmailSendingForm;
