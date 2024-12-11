const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi uses the calculateNumber method of the Utils', () => {
    const bigTest = sinon.spy(Utils);

    sendPaymentRequestToApi(100, 20);
    expect(bigTest.calculateNumber.calledWith('SUM', 100, 20)).to.be.true;
    expect(bigTest.calculateNumber.callCount).to.be.equal(1);
    bigTest.calculateNumber.restore();
  });
});
