import { body, param } from "express-validator";

export const createApplicationValidation = [
  param("positionId").isMongoId().withMessage("Valid position id is required"),
  body("applicantName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Applicant name is required"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("resumeLink")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Resume link is required"),
];
