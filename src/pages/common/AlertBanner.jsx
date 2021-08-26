import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const AlertBanner = ({ message, varient }) => {
  const alertMessage = message || 'An unexpected error occured. Please try again later.';
  const alertVarient = varient || 'danger';
  return (
    <Alert varient={alertVarient} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};
