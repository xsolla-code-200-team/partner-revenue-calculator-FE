import React, { useCallback, useState } from 'react';
import { Select } from 'xsolla-uikit';

const SelectField = ({
  name, onChangeReqData, options, ...props
}) => {
  const [choice, setChoice] = useState(options[0]);

  const handleSelect = (e) => {
    onChangeReqData(name, e.target.value);
    setChoice(e.target.value);
  };

  return (
    <select
      style={{ margin: '10px', padding: '0 10px 0 5px' }}
      value={choice}
      onChange={handleSelect}
    >
      { options.map((item) => <option value={item}>{item}</option>) }
    </select>
  );
};

export default SelectField;
