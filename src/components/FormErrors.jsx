import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'xsolla-uikit';

const FormErrors = ({ formErrors, ...props }) => (
  <>
    <Notification
      appearance="string"
      status="error"
      title={(
        <>
          {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName]) {
              return (
                <p key={i}>
                  {fieldName}
                  {' '}
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

// FormErrors.propTypes = {
//     formErrors: PropTypes.object.isRequired,
// };

export default FormErrors;
