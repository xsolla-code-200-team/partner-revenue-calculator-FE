import React from 'react';

import fonts from '../scss/fonts.scss';

const ResponseField = ({ name, value, ...props }) => (
  <>
    <p className={fonts.title2}>
      {name}
      :
      {' '}
      {value.toString()}
    </p>
  </>
);

export default ResponseField;
