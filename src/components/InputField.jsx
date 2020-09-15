import React, { useState } from 'react';
import { Input } from 'xsolla-uikit';

import fonts from '../scss/fonts.scss';

const InputField = ({ name, value, onChangeReqData, labelText, ...props }) => {
    const [state, setState] = useState(value);

    const handleChange = (e) => {
        onChangeReqData(name, e.target.value);
        setState(e.target.value);
    }

    return (
        <>
            <label className={fonts.title} style={{ marginTop: '1%' }}>{labelText}</label>
            <Input
            name={name}
            size="sm"
            input={{
                value: state,
                onChange: handleChange
            }}
            />
        </>
    );
}

export default InputField;
