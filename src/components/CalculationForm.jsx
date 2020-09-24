import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'xsolla-uikit';

import InputField from './inputField/InputField';
import CheckboxPlate from './checkboxPlate/CheckboxPlate';
import styles from '../scss/styles.scss';

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
];

const monetization = [
  'Free2Play',
  'Pay2Play',
];

const platforms = [
  'PC',
  'Mac',
  'Android',
  'iOS',
  'Web',
];

const regions = [1, 2, 3, 4, 8, 10, 11, 12, 13, 14];

const releaseDate = [
  'January-March',
  'April-June',
  'July-September',
  'October-December'
];

const CalculationForm = ({
  labels, onChangeResponseData, onClick, onChangeErrorMessage, url,  ...props
}) => {
  const [generalState, setGeneralState] = useState({
    isLoading: false,
    hasError: false,
  });

  const [reqData, setReqData] = useState({
    productName: '',
    genres: [],
    monetization: monetization[0],
    platforms: [],
    regions: [],
    companyName: '',
    email: '',
    ... props.additionalState
  });

  const [isValidForm, setIsValidForm] = useState(false);

  const [formErrors, setFormErrors] = useState({
    email: 'not checked yet',
    companyName: 'not checked yet',
    productName: 'not checked yet',
    genres: 'not checked yet',
    platforms: 'not checked yet',
    regions: 'not checked yet',
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

  const valuesToLowerCase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      let value = obj[key];
      if (key === 'productName' || key === 'companyName' || key === 'email') {
        //pass
        acc[key] = value;
      } else if (Array.isArray(value)) {
        value = value.map(element => element.toLowerCase());
        acc[key] = value;
      // } else if (typeof value === 'object') {
      //   console.log(`${value} is object`);
      //   value = valuesToLowerCase(value);
      //   console.log(value);
      } else {
        acc[key] = value.toLowerCase();
      }
      return acc;
    }, {});
  }

  const formValidation = () => {
    let isValid = true;
    Object.values(formErrors).forEach((item) => {
      if (item !== 'ok') {
        isValid = false;
      }
    });
    setIsValidForm(isValid);
  };

  const fieldsValidation = (inputName, inputValue) => {
    const errors = { ...formErrors };
    let OutputError = {
      hasError: false,
      errorMessage: 'ok',
    };
    let hasError = false;
    let errorMessage = 'ok';

    switch (inputName) {
      case 'companyName':
        if (!inputValue) {
          hasError = true;
          errorMessage = 'company name is required';
        }
        break;
      case 'productName':
        if (!inputValue) {
          hasError = true;
          errorMessage = 'product name is required';
        }
        break;
      case 'genres':
        if (!inputValue.length) {
          hasError = true;
          errorMessage = 'choose at least one genre';
        }
        break;
      case 'monetization':
        if (!inputValue) {
          hasError = true;
          errorMessage = 'monetization is required';
        }
        break;
      case 'releaseDate':
        if (!inputValue) {
          hasError = true;
          errorMessage = 'release date is required';
        }
        break;
      case 'platforms':
        if (!inputValue.length) {
          hasError = true;
          errorMessage = 'choose at least one platform';
        }
        break;
      case 'regions':
        if (!inputValue.length) {
          hasError = true;
          errorMessage = 'choose at least one region';
        }
        break;
      case 'sales':
        if (!inputValue) {
          hasError = true;
          errorMessage = "'sales' field is required";
        } else if (Number(inputValue) < 1) {
          hasError = true;
          errorMessage = 'sales must be positive';
        }
        break;
      case 'cost':
        if (!inputValue) {
          hasError = true;
          errorMessage = "'cost' field is required";
        } else if (Number(inputValue) < 1) {
          hasError = true;
          errorMessage = 'cost must be positive';
        }
        break;
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

    OutputError = {
      hasError,
      errorMessage,
    };

    errors[inputName] = errorMessage;
    // console.log(errors);
    setFormErrors(errors);

    return OutputError;
  };

  const handleClick = () => {
    setGeneralState({
      isLoading: true,
      hasError: false,
    });
    updateIsClicked(false);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...valuesToLowerCase(reqData) }),
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
    //     const error = new Error('Incorrect server response.');
    //     error.response = res;
    //     throw error;
    //   }
    //   return res;
    // })
      .then((res) => {
        setGeneralState({ ...generalState, isLoading: false });
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(JSON.stringify({ ...reqData }));
        updateResponseData(data);
        console.log('reqData:');
        console.log(valuesToLowerCase(reqData));
        console.log('resData (POST):');
        console.log(data);
        updateIsClicked(true);
      })
      .catch((e) => {
        console.log(e.message);
        updateErrorMessage(e.message);
        setGeneralState({ ...generalState, isLoading: false, hasError: true });
      });
  };

  const handleChangeFields = (name, value) => {
    setReqData({ ...reqData, [name]: value });
  };

  const updateResponseData = (data) => {
    onChangeResponseData(data);
  };

  const updateErrorMessage = (message) => {
    onChangeErrorMessage(message);
  };

  const updateIsClicked = (isClicked) => {
    onClick(isClicked);
  };

  return (
    <div className={styles.appMainPartFormViewQuestionsForm}>
      
      <InputField
        name="productName"
        value={reqData.productName}
        onChangeReqData={handleChangeFields}
        labelText={labels.productName}
        type="text"
        placeholder="super game"
        validation={fieldsValidation}
      />
      { props.isAdvanced &&
        <CheckboxPlate
          name="releaseDate"
          onChangeReqData={handleChangeFields}
          checkboxes={releaseDate}
          labelText={labels.releaseDate}
          multipleChoice={false}
          validation={fieldsValidation}
        />
      }
      <CheckboxPlate name="genres" onChangeReqData={handleChangeFields} checkboxes={genres} labelText={labels.genres} multipleChoice validation={fieldsValidation} />
      <CheckboxPlate name="monetization" onChangeReqData={handleChangeFields} checkboxes={monetization} labelText={labels.monetization} multipleChoice={false} validation={fieldsValidation} />
      <CheckboxPlate name="platforms" onChangeReqData={handleChangeFields} checkboxes={platforms} labelText={labels.platforms} multipleChoice validation={fieldsValidation} />
      <CheckboxPlate name="regions" onChangeReqData={handleChangeFields} checkboxes={regions} labelText={labels.regions} multipleChoice validation={fieldsValidation} />
      { props.isAdvanced &&
        <>
          <InputField
            name="sales"
            value={reqData.sales}
            onChangeReqData={handleChangeFields}
            labelText={labels.sales}
            type="number"
            placeholder="1 000 000"
            validation={fieldsValidation}
          />
          <InputField
            name="cost"
            value={reqData.cost}
            onChangeReqData={handleChangeFields}
            labelText={labels.cost}
            type="number"
            placeholder="60"
            validation={fieldsValidation}
          />
        </>
      }
      <InputField
        name="companyName"
        value={reqData.companyName}
        onChangeReqData={handleChangeFields}
        labelText={labels.companyName}
        type="text"
        placeholder="super company"
        validation={fieldsValidation}
      />
      <InputField
        name="email"
        value={reqData.email}
        onChangeReqData={handleChangeFields}
        labelText={labels.email}
        type="email"
        placeholder="your@email.com"
        validation={fieldsValidation}
      />
      <Button
        type="button"
        appearance="secondary"
        onClick={handleClick}
        disabled={!isValidForm}
        fetching={generalState.isLoading}
      >
        {labels.sendButton}
      </Button>
    </div>
  );
};

export default CalculationForm;
