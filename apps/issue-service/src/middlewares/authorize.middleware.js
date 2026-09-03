const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // console.log("JWT User:", req.user);

// console.log("Allowed Roles:", allowedRoles);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

   const userRoles = req.user.roles || [];

const hasPermission = userRoles.some((role) =>
  allowedRoles.includes(role)
);

if (!hasPermission) {
  return res.status(403).json({
    success: false,
    message: "Forbidden: Access denied",
  });
}

    next();
  };
};

export default authorize;