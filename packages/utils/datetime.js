export const getExpiryDate = (duration) => {
  const value = parseInt(duration, 10);
  const unit = duration.slice(-1);

  const expiresAt = new Date();

  switch (unit) {
    case "m":
      expiresAt.setMinutes(expiresAt.getMinutes() + value);
      break;

    case "h":
      expiresAt.setHours(expiresAt.getHours() + value);
      break;

    case "d":
      expiresAt.setDate(expiresAt.getDate() + value);
      break;

    default:
      throw new Error(`Unsupported duration: ${duration}`);
  }

  return expiresAt;
};