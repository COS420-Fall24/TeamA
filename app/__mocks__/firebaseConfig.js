const mockAdmin = {
  auth: () => ({
    createUser: jest.fn(),
    verifyIdToken: jest.fn()
  })
};

module.exports = mockAdmin; 