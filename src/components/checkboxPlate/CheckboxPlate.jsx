import React, { useEffect, useState, useCallback, useRef} from 'react';

import style from './style.scss';
import styles from '../../scss/styles.scss';
import fonts from '../../scss/fonts.scss';
import { func } from 'prop-types';

const CheckboxPlate = ({ name, onChangeReqData, checkboxes, labelText, multipleChoice, ...props }) => {
    const [group, setGroup] = useState(
        checkboxes.reduce(function(obj, item) {
            obj[`${item}`] = false;
            return obj;
        }, {})
    );

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            if (!multipleChoice) {
                setGroup({ ...group, [`${checkboxes[0]}`]: true });
            }
            firstRender.current = false;
            return;
        }
    }, [group]);

    const handler = (item) => {
        let newName = item;
        let value = !group[newName];

        if (multipleChoice) {
            let obj = { ...group, [newName]: value };
            let arr = Object.keys(obj).reduce(function(acc, item) {
                if (obj[`${item}`]) {
                    return [ ...acc, `${item}` ];
                } else {
                    return [ ...acc ];
                }
            }, []);
            onChangeReqData(name, arr);
            setGroup({ ...group, [newName]: value });
        } else {
            let obj = checkboxes.reduce(function(obj, item) {
                obj[`${item}`] = false;
                return obj;
            }, {});
            if (group[newName]) {
                value = true;
            }
            onChangeReqData(name, newName);
            setGroup({ ...obj, [newName]: value });
        }
    }

    return (
        <>
          <div className={style.plate} >
            <div className={styles["form-field-label"]} >
                <div className={styles["form-field-label-text"]} >{labelText}</div>
                <div className={styles["form-field-label-string"]} ></div>
            </div>
            <div className={style.checkboxes} >
                {
                    Object.keys(group).map((item) =>
                        <button type="button" key={item.toString()} value={item.toString()} onClick={() => handler(item)} className={`${style.componentButton} ${ group[`${item}`] ? style.buttonActive : style.buttonInactive}`}>
                            <span className={style.componentSpan} >{item.toString()}</span>
                        </button>
                    )
                }
            </div>
          </div>
        </>
    );
}

export default CheckboxPlate;
