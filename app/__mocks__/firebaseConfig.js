const mockAdmin = {
  auth: () => ({
    createUser: jest.fn(),
    verifyIdToken: jest.fn(),
    signInWithPopup: jest.fn(),
  })
};

module.exports = mockAdmin; 