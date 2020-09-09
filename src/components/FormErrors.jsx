import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'xsolla-uikit';

const FormErrors = ({ formErrors, ...props }) => {
    return (
        <>
          <Notification
            appearance="string"
            status="error"
            title={
                <Fragment>
                  {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName]) {
                      return (
                        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                      );
                    } else {
                      return '';
                    }
                  })}
                </Fragment>
            }
          />
        </>
    )
}

// FormErrors.propTypes = {
//     formErrors: PropTypes.object.isRequired,
// };

export default FormErrors;
