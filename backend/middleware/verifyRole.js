export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "User role missing" });
    }
    const userRole = String(req.user.role).toLowerCase();
    const normalizedRoles = allowedRoles.map((role) =>
      String(role).toLowerCase(),
    );
    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({ message: "You don't have permission" });
    }
    next();
  };
};
