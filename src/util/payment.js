function mockPaymentGateway(amount) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, transactionId: 'MOCK123456' }), 1000);
  });
}

module.exports = mockPaymentGateway;