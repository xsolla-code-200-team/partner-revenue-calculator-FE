import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import { Notification } from 'xsolla-uikit';

import { func } from 'prop-types';
import style from './style.scss';
import styles from '../../scss/styles.scss';
import fonts from '../../scss/fonts.scss';

const CheckboxPlate = ({
  name, onChangeReqData, checkboxes, labelText, multipleChoice, validation, ...props
}) => {
  const [group, setGroup] = useState(
    checkboxes.reduce((obj, item) => {
      obj[`${item}`] = false;
      return obj;
    }, {}),
  );
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      if (!multipleChoice) {
        setGroup({ ...group, [`${checkboxes[0]}`]: true });
      }
      firstRender.current = false;
    }
  }, [group]);

  const validate = (inputName, inputValue) => {
    setError(validation(inputName, inputValue));
  };

  const handler = (item) => {
    const newName = item;
    let value = !group[newName];

    if (multipleChoice) {
      const obj = { ...group, [newName]: value };
      // genres limitation (3 max)
      if (name === 'genres' && Object.keys(obj).filter(key => obj[key] === true).length > 3) {
        console.log('too many choices');
      } else {
        const arr = Object.keys(obj).reduce((acc, item) => {
          if (obj[`${item}`]) {
            return [...acc, `${item}`];
          }
          return [...acc];
        }, []);
        validate(name, arr);
        onChangeReqData(name, arr);
        setGroup({ ...group, [newName]: value });
      }
    } else {
      const obj = checkboxes.reduce((obj, item) => {
        obj[`${item}`] = false;
        return obj;
      }, {});
      if (group[newName]) {
        value = true;
      }
      validate(name, newName);
      onChangeReqData(name, newName);
      setGroup({ ...obj, [newName]: value });
    }
  };

  return (
    <>
      <div className={style.plate}>
        <div className={styles['mainPageFormFieldsLabel']}>
          <div className={styles['mainPageFormFieldsLabel__text']}>{labelText}</div>
          <div className={styles['mainPageFormFieldsLabel__line']} />
        </div>
        <div className={style.checkboxes}>
          {
                    Object.keys(group).map((item) => (
                      <button
                        type="button"
                        key={item.toString()}
                        value={item.toString()}
                        onClick={() => handler(item)}
                        className={`${style.componentButton} ${group[`${item}`] ? style.buttonActive : style.buttonInactive}`}
                      >
                        <span className={style.componentSpan}>{item.toString()}</span>
                      </button>
                    ))
                }
        </div>
        {
                error.hasError
                && (
                <Notification
                  appearance="string"
                  status="error"
                  title={error.errorMessage}
                />
                )
            }
      </div>
    </>
  );
};

export default CheckboxPlate;
