import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'xsolla-uikit';

import fonts from '../../scss/fonts.scss';
import style from './style.scss';
import styles from '../../scss/styles.scss';

const InputField = ({
  name, value, onChangeReqData, labelText, type, placeholder, validation, ...props
}) => {
  const [state, setState] = useState(value);
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });

  const firstRender = useRef(true);

  const validate = (inputName, inputValue) => {
    setError(validation(inputName, inputValue));
  };

  const handleBlur = () => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    validate(name, state);
  };

  const handleChange = (e) => {
    const value = type === 'number' ? Number(e.target.value.replace(/[^0-9]/g, '')) : e.target.value;

    if (!firstRender.current) {
      validate(name, value);
    } else {
      validation(name, value);
    }
    onChangeReqData(name, value);
    setState(value);
  };

  return (
    <>
    {
      labelText &&
      <div className={styles.mainPageFormFieldsLabel}>
        <div className={styles.mainPageFormFieldsLabel__text}>{labelText}</div>
        <div className={styles.mainPageFormFieldsLabel__line} />
      </div>
    }
      <div className={style.input} style={{ ...props.customStyle }}>
        <Input
          name={name}
          size="sm"
          input={{
            value: state,
            onChange: handleChange,
          }}
          placeholder={placeholder}
          validationAppearance="default"
          meta={{
            touched: error.hasError,
            error: error.errorMessage,
          }}
          onBlur={handleBlur}
          maxLength={50}
        />
      </div>
    </>
  );
};

export default InputField;
