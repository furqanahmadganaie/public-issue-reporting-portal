import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;  //Bearer abc.xyz.123
  // Authorization header is a standard HTTP header that is used to pass authentication credentials from the client to the server. 
  // It typically contains a token or credentials that the server can use to verify the identity of the client making the request. 
  // In this case, it is expected to contain a Bearer token, which is a type of access token used in OAuth 2.0 authentication.

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1]; // The split(" ")[1] part is used to extract the actual token from the Authorization header. 
  // The Authorization header typically has the format "Bearer <token>", where "Bearer" is a keyword indicating the type of token being
  //  used, and "<token>" is the actual token value. By splitting the string at the space character and taking the second element (index 1),
  //  we get just the token value without the "Bearer" prefix.

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // jwt.verify() is a method provided by the jsonwebtoken library that is used to verify 
    // the authenticity and integrity of a JSON Web Token (JWT). It takes two arguments: 
    // the token to be verified and the secret key that was used to sign the token. 
    // If the token is valid and has not been tampered with, it returns the decoded 
    // payload of the token, which typically contains user information and claims. 
    // If the token is invalid or expired, it throws an error.

    req.user = decoded; // req.user is a property that is commonly used in Express.js applications to store the authenticated user's information after successful authentication.
                        // now all cotroller will accesss  the login user 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authenticate;