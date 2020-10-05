import React, { useState, useEffect } from 'react';

import CalculationForm from './CalculationForm';

const releaseDate = [
    'January-March',
    'April-June',
    'July-September',
    'October-December'
  ];

const AdvancedCalculationForm = (props) => {
    const [reqData, setReqData] = useState({
        releaseDate: releaseDate[0],
        isReleased: false,
        initialRevenue: ''
    });

    return (
        <CalculationForm
          labels={props.labels}
          onChangeResponseData={props.onChangeResponseData}
          onChangeGenresInfo={props.onChangeGenresInfo}
          onClick={props.onClick}
          onChangeErrorMessage={props.onChangeErrorMessage}
          additionalState={reqData}
          isAdvanced={true}
          url={props.url}
        />
    );
}

export default AdvancedCalculationForm;
