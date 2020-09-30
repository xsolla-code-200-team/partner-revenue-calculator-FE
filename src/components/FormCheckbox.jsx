import React from 'react';
import { Checkbox } from 'xsolla-uikit';

import styles from '../scss/styles.scss';

const FormCheckbox = ({ name, value, onChangeReqData, labelText, validation, ...props }) => {
    const handleChange = () => {
        const newValue = !value;
        validation(name, newValue);
        onChangeReqData(name, newValue);
    }

    return (
        <div className={styles.mainPageFormFields__checkbox}>
            <Checkbox
              input={{
                value: value,
                onChange: handleChange,
              }}
              name={name}
            label={<p className={styles.mainPageFormFieldsLabel__text_small}>{labelText}</p>}
            />
        </div>
    );
};

export default FormCheckbox;
