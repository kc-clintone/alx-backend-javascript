const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi calls console.log with the right arguments', () => {
    const bigTest = sinon.spy(console);
    const dummyTest = sinon.stub(Utils, 'calculateNumber');

    dummyTest.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(dummyTest.calledWith('SUM', 100, 20)).to.be.true;
    expect(dummyTest.callCount).to.be.equal(1);
    expect(bigTest.log.calledWith('The total is: 10')).to.be.true;
    expect(bigTest.log.callCount).to.be.equal(1);
    dummyTest.restore();
    bigTest.log.restore();
  });
});
