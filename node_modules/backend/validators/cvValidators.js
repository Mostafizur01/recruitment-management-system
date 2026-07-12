import { body, param } from "express-validator";

export const updateCVValidation = [
  param("candidateId")
    .isMongoId()
    .withMessage("Valid candidate id is required"),
  body("cvData").notEmpty().withMessage("CV data is required"),
  body("version")
    .isInt({ min: 1 })
    .withMessage("Version number must be a positive integer"),
];
