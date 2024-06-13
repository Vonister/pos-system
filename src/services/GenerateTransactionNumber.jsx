import React from 'react';

const GenerateTransactionNumber = () => {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now().toString().slice(-6); // Use last 6 digits for brevity

  // Generate a random alphanumeric string, convert to base-36, and slice to get 3 characters
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();

  // Combine timestamp and random part with a delimiter
  const transactionNumber = `${timestamp}-${randomPart}`;

  return transactionNumber;
};

export default GenerateTransactionNumber;
