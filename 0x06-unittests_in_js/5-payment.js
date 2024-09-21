const Utils = require('./utils');

const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  const sumCost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${sumCost}`);
};

module.exports = sendPaymentRequestToApi;
