const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];

    const isAuthorized = allowedRoles.some(role =>
      userRoles.includes(role)
    );

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};

export default authorize;