import React, { useState } from 'react';
import { Input } from 'xsolla-uikit';

import fonts from '../../scss/fonts.scss';
import style from './style.scss';
import styles from '../../scss/styles.scss';

const InputField = ({ name, value, onChangeReqData, labelText, type, placeholder, ...props }) => {
    const [state, setState] = useState(value);

    const handleChange = (e) => {
        onChangeReqData(name, e.target.value);
        setState(e.target.value);
    }

    return (
        <>
            <div className={styles["form-field-label"]} >
                <div className={styles["form-field-label-text"]} >{labelText}</div>
                <div className={styles["form-field-label-string"]} ></div>
            </div>
            <div className={style.input}>
                <Input
                name={name}
                type={type}
                size="sm"
                input={{
                    value: state,
                    onChange: handleChange
                }}
                placeholder={placeholder}
                />
            </div>
        </>
    );
}

export default InputField;
