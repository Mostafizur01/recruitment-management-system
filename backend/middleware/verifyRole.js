export const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "You don't have permission" });
    }
    next();
  };
};
