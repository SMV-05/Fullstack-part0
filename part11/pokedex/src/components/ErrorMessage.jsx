import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message" data-testid="error-message">
      An error occurred: {error ? error.message || String(error) : 'Unknown error'}
    </div>
  );
};

export default ErrorMessage;
