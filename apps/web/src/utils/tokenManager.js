let accessToken = null;

const tokenManager = {
    // Set the access token
  setToken(token) {
    accessToken = token;
  },
 // Get the access token
  getToken() {
    return accessToken;
  },

  clearToken() {
    accessToken = null;
  },
};

export default tokenManager;