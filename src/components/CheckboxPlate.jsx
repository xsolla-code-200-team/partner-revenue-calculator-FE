import React, { useEffect, useState, useCallback} from 'react';
import { Checkbox, CheckboxGroup } from 'xsolla-uikit';

const CheckboxPlate = ({ name, onChangeReqData, checkboxes, ...props }) => {
    const [group, setGroup] = useState(
        checkboxes.reduce(function(obj, item) {
            obj[`${item}`] = false;
            return obj;
        }, {})
    );

    const handler = (e) => {
        let obj = { ...group, [e.target.name]: e.target.checked };
        let arr = Object.keys(obj).reduce(function(acc, item) {
            if (obj[`${item}`]) {
                return [ ...acc, `${item}` ];
            } else {
                return [ ...acc ];
            }
        }, []);
        onChangeReqData(name, arr);
        setGroup({ ...group, [e.target.name]: e.target.checked });
    }

    return (
        <>
          {
              Object.keys(group).map((item) =>
                  <Checkbox
                  input={{ value: group[`${item}`], onChange: handler }}
                  name={item.toString()}
                  id={item.toString()}
                  label={<label>{item.toString()}</label>}
                  key={item.toString()}
                  />
              )
          }
        </>
    );
}

export default CheckboxPlate;
