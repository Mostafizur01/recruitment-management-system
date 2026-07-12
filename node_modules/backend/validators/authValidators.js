import { body } from "express-validator";

export const registerValidation = [
  body().custom((value, { req }) => {
    const hasFullName = req.body.fullName || req.body.fastName || req.body.name;
    const hasFirstLast = req.body.firstName && req.body.lastName;
    if (!hasFullName && !hasFirstLast) {
      throw new Error("Name is required");
    }
    return true;
  }),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
