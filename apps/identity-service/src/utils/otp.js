import crypto from "crypto"; 
// crypto is used to  generate a cryptographically strong random number.
    
export const generateOTP = (length = 6) => {
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += crypto.randomInt(0, 10);
  }

  return otp;
};