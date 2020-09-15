import React, { Fragment } from 'react';
import { Notification } from 'xsolla-uikit';

const FormErrors = ({ formErrors, ...props }) => (
  <>
    <Notification
      appearance="string"
      status="error"
      title={(
        <>
          {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName] !== 'skip') {
              return (
                <p key={i}>
                  {formErrors[fieldName]}
                </p>
              );
            }
            return '';
          })}
        </>
              )}
    />
  </>
);

export default FormErrors;
