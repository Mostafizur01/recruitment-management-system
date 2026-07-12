import { body, param } from "express-validator";

export const createPositionValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("requiredAttributes")
    .optional()
    .isArray()
    .withMessage("requiredAttributes must be an array of attribute IDs"),
];

export const updatePositionValidation = [
  param("id").isMongoId().withMessage("Valid position id is required"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be blank"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be blank"),
  body("status")
    .optional()
    .isIn(["Active", "Closed"])
    .withMessage("Status must be Active or Closed"),
];
